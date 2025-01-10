import { WEEK_DAYS } from '../constants/common';

export const getNoOfDaysInMonth = (
  month: number,
  year: number
): number | null => {
  return new Date(year, month, 0).getDate();
};

export const getDayByDate = (date: Date | string) => {
  return new Date(date)?.getDay();
};

export const getPreviousDate = (date: Date | string, count: number = 1) => {
  const givenDate = new Date(date);
  givenDate.setDate(givenDate.getDate() - count);
  return givenDate;
};
