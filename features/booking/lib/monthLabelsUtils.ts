import type { Swiper as SwiperType } from 'swiper';
import type { RefObject } from 'react';
import {
  getMonthKey,
  formatMonthShort,
  isSlideVisible,
  checkSlideVisibility,
  getElementPosition,
} from '../../../shared';
import type {
  MonthLabel,
  LeftmostVisibleDay,
  LeftmostDayWithPosition,
  LeftmostLastDay,
  FixedMonthResult,
} from './types';

type LeftmostDayAccumulator = {
  readonly dayIndex: number;
  readonly monthKey: number;
  readonly position: number;
};

const getEmptyDomRect = (): DOMRect => {
  if (typeof DOMRect !== 'undefined') {
    return new DOMRect(0, 0, 0, 0);
  }
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => ({}),
  } as DOMRect;
};

const MAX_POSITION = Infinity;
const FIXED_POSITION = 0;
const LEFT_EDGE_POSITION = 0;

const getSlideRect = (slide: Element): DOMRect => {
  if (!(slide instanceof HTMLElement)) {
    return getEmptyDomRect();
  }
  return slide.getBoundingClientRect();
};

const getSlidePosition = (slideRect: DOMRect, swiperRect: DOMRect): number => (
  slideRect.left - swiperRect.left
);

export const findLeftmostVisibleDay = (
  swiper: SwiperType,
  swiperRect: DOMRect,
  dates: readonly Date[],
): LeftmostVisibleDay | null => {
  const result = dates.reduce<LeftmostDayAccumulator | null>(
    (leftmost, date, index) => {
      const slide = swiper.slides[index];
      if (!slide) return leftmost;

      const slideRect = getSlideRect(slide);
      const position = getSlidePosition(slideRect, swiperRect);

      if (isSlideVisible(slideRect, swiperRect) && (!leftmost || position < leftmost.position)) {
        return {
          dayIndex: index,
          monthKey: getMonthKey(date),
          position,
        };
      }

      return leftmost;
    },
    null,
  );

  if (!result) return null;

  const { dayIndex, monthKey } = result;
  return { dayIndex, monthKey };
};

export const findLeftmostFirstDay = (
  swiper: SwiperType,
  swiperRect: DOMRect,
  visibleSlides: unknown[],
  firstDayIndices: readonly number[],
): LeftmostDayWithPosition | null => firstDayIndices.reduce<
LeftmostDayWithPosition | null
>(
  (leftmost, dayIndex) => {
    const slide = swiper.slides[dayIndex];
    if (!slide) return leftmost;

    const slideRect = getSlideRect(slide);
    const position = getSlidePosition(slideRect, swiperRect);

    if (checkSlideVisibility(dayIndex, slideRect, swiperRect, visibleSlides)) {
      if (!leftmost || position < leftmost.position) {
        return { dayIndex, position };
      }
    }

    return leftmost;
  },
  null,
);

export const findLeftmostLastDay = (
  swiper: SwiperType,
  swiperRect: DOMRect,
  visibleSlides: unknown[],
  lastDayIndices: readonly number[],
  dates: readonly Date[],
): LeftmostLastDay | null => lastDayIndices.reduce<
LeftmostLastDay | null
>(
  (leftmost, dayIndex) => {
    const slide = swiper.slides[dayIndex];
    if (!slide) return leftmost;

    const slideRect = getSlideRect(slide);
    const position = getSlidePosition(slideRect, swiperRect);

    if (checkSlideVisibility(dayIndex, slideRect, swiperRect, visibleSlides)) {
      const monthKey = getMonthKey(dates[dayIndex]);
      if (!leftmost || position < leftmost.position) {
        return { dayIndex, position, monthKey };
      }
    }

    return leftmost;
  },
  null,
);

export const hasFixedMonthVisibleDays = (
  swiper: SwiperType,
  swiperRect: DOMRect,
  dates: readonly Date[],
  fixedMonthIndex: number | null,
): boolean => {
  if (fixedMonthIndex === null) return false;

  const fixedMonthKey = getMonthKey(dates[fixedMonthIndex]);

  return dates.some((date, index) => {
    if (getMonthKey(date) !== fixedMonthKey) return false;

    const slide = swiper.slides[index];
    if (!slide) return false;

    const slideRect = getSlideRect(slide);
    return isSlideVisible(slideRect, swiperRect);
  });
};

export const findFirstDayOfMonth = (
  firstDayIndices: readonly number[],
  dates: readonly Date[],
  monthKey: number,
): number | undefined => firstDayIndices.find(
  (firstDayIndex) => getMonthKey(dates[firstDayIndex]) === monthKey,
);

export const determineFixedMonth = (
  leftmostVisibleDay: LeftmostVisibleDay | null,
  leftmostLastDay: LeftmostLastDay | null,
  leftmostFirstDay: LeftmostDayWithPosition | null,
  firstDayIndices: readonly number[],
  dates: readonly Date[],
  fixedMonthIndex: number | null,
  currentFixedMonthHasVisibleDays: boolean,
): FixedMonthResult => {
  if (leftmostVisibleDay) {
    const firstDayOfLeftmostMonth = findFirstDayOfMonth(
      firstDayIndices,
      dates,
      leftmostVisibleDay.monthKey,
    );

    if (firstDayOfLeftmostMonth !== undefined) {
      return { shouldFix: true, leftmostDayIndex: firstDayOfLeftmostMonth };
    }
  }

  if (leftmostLastDay) {
    const isLastDayAtLeftEdge = leftmostLastDay.position <= LEFT_EDGE_POSITION;
    const firstDayPosition = leftmostFirstDay?.position ?? MAX_POSITION;
    const isLastDayLeftmost = !leftmostFirstDay || leftmostLastDay.position < firstDayPosition;

    if (isLastDayAtLeftEdge || isLastDayLeftmost) {
      const firstDayOfLastMonth = findFirstDayOfMonth(
        firstDayIndices,
        dates,
        leftmostLastDay.monthKey,
      );

      if (firstDayOfLastMonth !== undefined) {
        const isDifferentMonth = fixedMonthIndex === null
          || firstDayOfLastMonth !== fixedMonthIndex;
        if (isDifferentMonth && !currentFixedMonthHasVisibleDays) {
          return { shouldFix: true, leftmostDayIndex: firstDayOfLastMonth };
        }
      }
    }
  }

  return { shouldFix: false, leftmostDayIndex: null };
};

export const createMonthLabels = (
  firstDayIndices: readonly number[],
  dates: readonly Date[],
  swiperRect: DOMRect,
  dayRefs: RefObject<Map<number, HTMLButtonElement>>,
  swiper: SwiperType,
  newFixedIndex: number | null,
): readonly MonthLabel[] => firstDayIndices.map((dayIndex) => {
  const firstDayDate = dates[dayIndex];
  const monthNameLabel = formatMonthShort(firstDayDate);
  const position = getElementPosition(dayIndex, swiperRect, dayRefs, swiper);
  const isFixed = newFixedIndex !== null && dayIndex === newFixedIndex;

  return {
    dayIndex,
    monthName: monthNameLabel,
    position: isFixed ? FIXED_POSITION : position,
    isFixed,
  };
});

export const shouldUnfixMonth = (
  swiper: SwiperType,
  swiperRect: DOMRect,
  fixedMonthIndex: number,
): boolean => {
  const currentFixedSlide = swiper.slides[fixedMonthIndex];
  if (!currentFixedSlide || !(currentFixedSlide instanceof HTMLElement)) return false;

  const currentRect = getSlideRect(currentFixedSlide);
  const currentPosition = getSlidePosition(currentRect, swiperRect);

  return currentPosition > LEFT_EDGE_POSITION;
};
