import type { TimeSlot } from './types';

const START_HOUR = 0 as const;
const END_HOUR = 24 as const;
const MINUTES_INTERVAL = 15 as const;
const MINUTES_PER_HOUR = 60 as const;

const DEFAULT_LOCALE = 'en-US' as const;

const TIME_FORMAT_OPTIONS = {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
} as const;

const formatTime = (date: Date): string => new Intl.DateTimeFormat(
  DEFAULT_LOCALE,
  TIME_FORMAT_OPTIONS,
).format(date);

const createSlotDate = (
  baseDate: Date,
  hour: number,
  minute: number,
): Date => new Date(
  baseDate.getFullYear(),
  baseDate.getMonth(),
  baseDate.getDate(),
  hour,
  minute,
);

const createTimeSlot = (date: Date): TimeSlot => ({
  time: formatTime(date),
  date,
});

const generateTimeSlots = (selectedDate?: Date): TimeSlot[] => {
  const baseDate = selectedDate ?? new Date();

  const hours = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, index) => START_HOUR + index,
  );

  const minutes = Array.from(
    { length: MINUTES_PER_HOUR / MINUTES_INTERVAL },
    (_, index) => index * MINUTES_INTERVAL,
  );

  const regularSlots: TimeSlot[] = hours.flatMap((hour) => minutes.map((minute) => {
    const slotDate = createSlotDate(baseDate, hour, minute);
    return createTimeSlot(slotDate);
  }));

  return regularSlots;
};

export default generateTimeSlots;
