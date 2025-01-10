import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MONTHS, WEEK_DAYS } from '../../../../constants/common';
import { getDayByDate, getNoOfDaysInMonth } from '../../../../utils/date';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SelectFieldComponent } from '../../form-fields/select-field/select-field.component';

@Component({
  selector: 'month-view',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './month-view.component.html',
  styleUrl: './month-view.component.scss',
})
export class MonthViewComponent {
  days: string[] = WEEK_DAYS;
  @Input() collection: any[] = [];

  date!: number;
  year!: number;
  month!: number;

  onDayClick(date: any) {
    console.log({ date });
  }

  ngOnInit(): void {
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
    this.date = new Date().getDate();
  }
}
