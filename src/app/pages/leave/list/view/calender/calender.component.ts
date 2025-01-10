import { Component } from '@angular/core';
import { WEEK_DAYS, MONTHS } from '../../../../../constants/common';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { getDayByDate, getNoOfDaysInMonth } from '../../../../../utils/date';
import { CalendarViewComponent } from '../../../../../components/shared/calendar-view/calendar-view.component';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule, MatGridListModule, CalendarViewComponent],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss',
})
export class CalenderComponent {}
