import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MONTHS, WEEK_DAYS } from '../../../../constants/common';
import { getDayByDate, getNoOfDaysInMonth } from '../../../../utils/date';

@Component({
  selector: 'month-view',
  standalone: true,
  imports: [MatGridListModule, CommonModule],
  templateUrl: './month-view.component.html',
  styleUrl: './month-view.component.scss',
})
export class MonthViewComponent {
  days: string[] = WEEK_DAYS;

  date!: number;
  year!: number;
  month!: number;

  dateCollection!: any[];

  setDateCollection(month: number, year: number) {
    const numberOfDays = getNoOfDaysInMonth(month, year);
    if (!numberOfDays) return;

    const days = [];
    const monthDayStartIndex = getDayByDate(`${year}-${month + 1}-${1}`);
    const monthDayEndIndex = getDayByDate(
      `${year}-${month + 1}-${numberOfDays}`
    );

    for (let index = 0; index < numberOfDays; index++) {
      days?.push({
        date: index + 1,
        month: MONTHS[month],
        day: WEEK_DAYS[
          index === 0
            ? monthDayStartIndex
            : getDayByDate(`${year}-${month + 1}-${index + 1}`)
        ],
      });
    }

    for (let index = monthDayStartIndex - 1; index >= 0; index--) {
      days?.unshift({
        isDisabled: true,
      });
    }

    for (let index = monthDayEndIndex + 1; index < WEEK_DAYS?.length; index++) {
      days?.push({
        isDisabled: true,
      });
    }

    this.dateCollection = days;
  }

  onDayClick(date: any) {
    console.log({ date });
  }

  ngOnInit(): void {
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
    this.date = new Date().getDate();

    this.setDateCollection(this.month, this.year);
  }
}
