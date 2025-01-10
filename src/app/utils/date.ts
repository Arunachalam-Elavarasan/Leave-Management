import { WEEK_DAYS } from '../constants/common';
import { CurrentMonthCalendar } from '../model/calendar';

export const getNoOfDaysInMonth = (
  month: number,
  year: number
): number | null => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDayByDate = (date: Date | string) => {
  return new Date(date)?.getDay();
};

export const getPreviousDate = (date: Date | string, count: number = 1) => {
  const givenDate = new Date(date);
  givenDate.setDate(givenDate.getDate() - count);
  return givenDate;
};

export const getPreMonth = (
  month: number,
  year: number
): CurrentMonthCalendar => {
  const preMonth = month - 1;
  return preMonth < 0
    ? { month: 11, year: year - 1 }
    : { year, month: preMonth };
};

export const getNextMonth = (
  month: number,
  year: number
): CurrentMonthCalendar => {
  const nextMonth = month + 1;
  return nextMonth > 11
    ? { month: 0, year: year + 1 }
    : { year, month: nextMonth };
};
