import { addDays, startOfDay } from 'date-fns';

const DAYS_PER_WEEK = 7;

const generateDateRange = (startDate: Date, weeks: number): Date[] => {
  const start = startOfDay(startDate);
  const totalDays = weeks * DAYS_PER_WEEK;
  const totalDaysInclusive = totalDays + 1;

  return Array.from({ length: totalDaysInclusive }, (_, index) => addDays(start, index));
};

export default generateDateRange;
