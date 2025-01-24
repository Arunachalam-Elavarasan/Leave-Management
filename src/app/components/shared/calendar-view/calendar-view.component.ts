import { Component, Input } from '@angular/core';
import { MonthViewComponent } from './month/month-view.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MONTHS, WEEK_DAYS } from '../../../constants/common';
import { CurrentCalendar } from '../../../model/calendar';
import {
  getDayByDate,
  getNextCalendarView,
  getDayView,
  getNoOfDaysInMonth,
  getPreCalendarView,
} from '../../../utils/date';
import { getDurationBetweenTwoDates } from '../../../utils/common';
import { CommonModule } from '@angular/common';
import { WeekComponent } from './week/week.component';
import { DayComponent } from './day/day.component';

type CalendarType = 'day' | 'month' | 'year' | 'week';

@Component({
  selector: 'calendar-view',
  standalone: true,
  imports: [
    MonthViewComponent,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    WeekComponent,
    DayComponent,
  ],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss',
})
export class CalendarViewComponent {
  @Input() data!: any;
  @Input() type: CalendarType = 'day';

  months: string[] = MONTHS;
  dateCollection: any = [];
  calendarTitle: string = '';

  currentMonthCalendar: CurrentCalendar = {
    month: new Date()?.getMonth(),
    year: new Date()?.getFullYear(),
    date: new Date().getDate(),
    day: MONTHS?.[new Date().getDate()],
  };

  setDateCollection(month: number, year: number) {
    const numberOfDays = getNoOfDaysInMonth(month, year);
    if (!numberOfDays) return;

    const days = [];
    const monthDayStartIndex = getDayByDate(`${year}-${month + 1}-${1}`);
    const monthDayEndIndex = getDayByDate(
      `${year}-${month + 1}-${numberOfDays}`
    );

    for (let index = 0; index < numberOfDays; index++) {
      days?.push({ date: new Date(year, month, index + 1) });
    }

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month, numberOfDays);

    for (let index = 1; index <= monthDayStartIndex; index++) {
      days?.unshift({
        date: firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1),
        isDisabled: true,
      });
    }

    for (let index = monthDayEndIndex + 1; index < WEEK_DAYS?.length; index++) {
      days?.push({
        date: lastDayOfMonth.setDate(lastDayOfMonth.getDate() + 1),
        isDisabled: true,
      });
    }

    this.dateCollection = days;
  }

  setCalendarTitle(data: CurrentCalendar) {
    if (this.type === 'month') {
      this.calendarTitle = `${MONTHS[data?.month]} ${data?.year}`;
    }

    if (this.type === 'day') {
      this.calendarTitle = `${data?.date} ${MONTHS[data?.month]} ${data?.year}`;
    }
  }

  onCalendarChange(next: boolean) {
    let newValue: CurrentCalendar = this.currentMonthCalendar;

    switch (this.type) {
      case 'day':
        newValue = getDayView(this.currentMonthCalendar, next);
        break;

      case 'week':
        break;

      case 'month':
        newValue = next
          ? getNextCalendarView(this.currentMonthCalendar)
          : getPreCalendarView(this.currentMonthCalendar);

        this.setDateCollection(newValue?.month, newValue?.year);
        break;

      case 'year':
        break;
    }

    this.setCalendarTitle(newValue);

    this.currentMonthCalendar = newValue;
  }

  ngOnInit(): void {
    getDurationBetweenTwoDates(new Date(), new Date().getDate() + 5);
    this.setDateCollection(
      this.currentMonthCalendar?.month,
      this.currentMonthCalendar?.year
    );

    this.setCalendarTitle(this.currentMonthCalendar);
  }
}
