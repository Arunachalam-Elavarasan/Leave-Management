import { WEEK_DAYS } from '../constants/common';
import { CurrentCalendar } from '../model/calendar';

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

export const getPreCalendarView = (data: CurrentCalendar): CurrentCalendar => {
  const preMonth = data?.month - 1;
  return preMonth < 0
    ? { ...data, month: 11, year: data?.year - 1 }
    : { ...data, year: data?.year, month: preMonth };
};

export const getNextCalendarView = (data: CurrentCalendar): CurrentCalendar => {
  const nextMonth = data?.month + 1;
  return nextMonth > 11
    ? { ...data, month: 0, year: data?.year + 1 }
    : { ...data, year: data?.year, month: nextMonth };
};

export const getBetweenDates = (startDate: Date, endDate: Date): Date[] => {
  const dates: any[] = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

export const getDayView = (
  data: CurrentCalendar,
  goNext: boolean
): CurrentCalendar => {
  const date = new Date(data?.year, data?.month, data?.date);
  const nextDay = new Date(date.setDate(date.getDate() - (goNext ? -1 : 1)));
  return {
    date: nextDay?.getDate(),
    day: WEEK_DAYS[nextDay?.getDay()],
    month: nextDay?.getMonth(),
    year: nextDay?.getFullYear(),
  };
};
