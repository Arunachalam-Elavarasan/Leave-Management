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

  mockData = {
    ie34: ['2025-01-10', '2025-01-11'],
    ie36: ['2025-01-10', '2025-01-11'],
    ie37: ['2025-01-10', '2025-01-11'],
    i3ed: {
      '2025-01-10': true,
      '2025-01-11': true,
      '2025-01-12': true,
    },
  };

  today = new Date();

  onDayClick(date: any) {
    console.log({ date });
  }
}
