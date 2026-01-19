'use client';

import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import type { Swiper as SwiperType } from 'swiper';
import generateDateRange from '../lib/dateRangeUtils';
import generateTimeSlots from '../lib/timeRangeUtils';
import { WEEKS_TO_GENERATE } from '../lib/constants';
import useMonthLabels from './useMonthLabels';

function useBookingCard() {
  const dates = useMemo(() => generateDateRange(new Date(), WEEKS_TO_GENERATE), []);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number | undefined>(undefined);
  const selectedDate = useMemo(
    () => (selectedIndex !== undefined ? dates[selectedIndex] : undefined),
    [selectedIndex, dates],
  );
  const timeSlots = useMemo(
    () => (selectedDate ? generateTimeSlots(selectedDate) : []),
    [selectedDate],
  );
  const [isDaysSwiperEnd, setIsDaysSwiperEnd] = useState(false);
  const [isDaysSwiperBeginning, setIsDaysSwiperBeginning] = useState(true);
  const [isTimeSwiperEnd, setIsTimeSwiperEnd] = useState(false);
  const [isTimeSwiperBeginning, setIsTimeSwiperBeginning] = useState(true);
  const dayRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const monthLabelRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<SwiperType | null>(null);
  const monthLabelsWrapperRef = useRef<HTMLDivElement>(null);

  const { monthLabels, updateMonthLabels } = useMonthLabels({
    dates,
    dayRefs,
    swiperContainerRef,
    swiperInstanceRef,
    monthLabelsWrapperRef,
    monthLabelRefs,
  });

  const handleLabelRef = useCallback((dayIndex: number) => (el: HTMLDivElement | null) => {
    if (el) {
      monthLabelRefs.current.set(dayIndex, el);
    } else {
      monthLabelRefs.current.delete(dayIndex);
    }
  }, []);

  const handleSelect = useCallback((index: number) => {
    setSelectedIndex((prevIndex) => {
      const newIndex = prevIndex === index ? undefined : index;
      return newIndex;
    });
  }, []);

  useEffect(() => {
    setSelectedTimeIndex(undefined);
  }, [selectedIndex]);

  const handleDaysSwiperReachEnd = useCallback((isEnd: boolean) => {
    setIsDaysSwiperEnd(isEnd);
  }, []);

  const handleDaysSwiperReachBeginning = useCallback((isBeginning: boolean) => {
    setIsDaysSwiperBeginning(isBeginning);
  }, []);

  const handleTimeSelect = useCallback((index: number) => {
    setSelectedTimeIndex((prevIndex) => (prevIndex === index ? undefined : index));
  }, []);

  const handleTimeSwiperReachEnd = useCallback((isEnd: boolean) => {
    setIsTimeSwiperEnd(isEnd);
  }, []);

  const handleTimeSwiperReachBeginning = useCallback((isBeginning: boolean) => {
    setIsTimeSwiperBeginning(isBeginning);
  }, []);

  const handleSwiperReady = useCallback((swiper: SwiperType) => {
    swiperInstanceRef.current = swiper;
    updateMonthLabels();
  }, [updateMonthLabels]);

  const handleDayRef = useCallback((index: number) => (el: HTMLButtonElement | null) => {
    if (el) {
      dayRefs.current.set(index, el);
    } else {
      dayRefs.current.delete(index);
    }
  }, []);

  const isButtonDisabled = useMemo(
    () => selectedIndex === undefined
      || selectedTimeIndex === undefined
      || (selectedTimeIndex !== undefined
        && (timeSlots[selectedTimeIndex]?.date.getTime() ?? 0) <= Date.now()),
    [selectedIndex, selectedTimeIndex, timeSlots],
  );

  const handleConfirm = useCallback(() => {
    if (selectedIndex === undefined || selectedTimeIndex === undefined) {
      return;
    }
    const selectedTimeSlot = timeSlots[selectedTimeIndex];
    if (!selectedTimeSlot) return;
    const timestamp = selectedTimeSlot.date.getTime();
    // eslint-disable-next-line no-console
    console.log({ timestamp: Math.floor(timestamp / 1000) });
  }, [selectedIndex, selectedTimeIndex, timeSlots]);

  return {
    dates,
    selectedIndex,
    selectedTimeIndex,
    selectedDate,
    timeSlots,
    isDaysSwiperEnd,
    isDaysSwiperBeginning,
    isTimeSwiperEnd,
    isTimeSwiperBeginning,
    dayRefs,
    monthLabelRefs,
    swiperContainerRef,
    swiperInstanceRef,
    monthLabelsWrapperRef,
    monthLabels,
    updateMonthLabels,
    handleLabelRef,
    handleSelect,
    handleDaysSwiperReachEnd,
    handleDaysSwiperReachBeginning,
    handleTimeSelect,
    handleTimeSwiperReachEnd,
    handleTimeSwiperReachBeginning,
    handleSwiperReady,
    handleDayRef,
    isButtonDisabled,
    handleConfirm,
  };
}

export default useBookingCard;
