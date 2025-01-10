import { Component } from '@angular/core';
import { MonthViewComponent } from './month/month-view.component';

@Component({
  selector: 'calendar-view',
  standalone: true,
  imports: [MonthViewComponent],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss',
})
export class CalendarViewComponent {}
