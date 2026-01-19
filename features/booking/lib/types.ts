export type BookingCardBaseProps = {
  title: string;
  text: string;
  daysSlidesPerView: number | 'auto';
  daysSlidesPerGroup?: number;
  timeSlidesPerView: number | 'auto';
  timeSlidesPerGroup?: number;
};

export type SwiperConfigValue = {
  readonly slidesPerView: number | 'auto';
  readonly slidesPerGroup: number;
};

export type SwiperConfig = {
  readonly desktop: {
    readonly days: SwiperConfigValue;
    readonly time: SwiperConfigValue;
  };
  readonly mobile: {
    readonly days: SwiperConfigValue;
    readonly time: SwiperConfigValue;
  };
};

export type TimeSlot = {
  readonly time: string;
  readonly date: Date;
};

export type LeftmostVisibleDay = {
  readonly dayIndex: number;
  readonly monthKey: number;
};

export type LeftmostDayWithPosition = {
  readonly dayIndex: number;
  readonly position: number;
};

export type LeftmostLastDay = {
  readonly dayIndex: number;
  readonly position: number;
  readonly monthKey: number;
};

export type FixedMonthResult = {
  readonly shouldFix: boolean;
  readonly leftmostDayIndex: number | null;
};

export type MonthLabel = {
  readonly dayIndex: number;
  readonly monthName: string;
  readonly position: number;
  readonly isFixed: boolean;
};
