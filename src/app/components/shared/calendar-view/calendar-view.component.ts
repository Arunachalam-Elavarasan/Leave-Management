import { Component } from '@angular/core';
import { MonthViewComponent } from './month/month-view.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MONTHS, WEEK_DAYS } from '../../../constants/common';
import { CurrentMonthCalendar } from '../../../model/calendar';
import {
  getDayByDate,
  getNextMonth,
  getNoOfDaysInMonth,
  getPreMonth,
} from '../../../utils/date';

@Component({
  selector: 'calendar-view',
  standalone: true,
  imports: [MonthViewComponent, MatButtonModule, MatIconModule],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss',
})
export class CalendarViewComponent {
  months: string[] = MONTHS;

  dateCollection: any = [];

  currentMonthCalendar: CurrentMonthCalendar = {
    month: new Date()?.getMonth(),
    year: new Date()?.getFullYear(),
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

  onMonthChange(next: boolean) {
    const month = this.currentMonthCalendar?.month;
    const year = this.currentMonthCalendar.year;
    const newValue: CurrentMonthCalendar = next
      ? getNextMonth(month, year)
      : getPreMonth(month, year);

    this.setDateCollection(newValue?.month, newValue?.year);
    this.currentMonthCalendar = newValue;
  }

  ngOnInit(): void {
    this.setDateCollection(
      this.currentMonthCalendar?.month,
      this.currentMonthCalendar?.year
    );
  }
}
