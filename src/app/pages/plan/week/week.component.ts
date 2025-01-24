import { Component } from '@angular/core';
import { CalendarViewComponent } from '../../../components/shared/calendar-view/calendar-view.component';

@Component({
  selector: 'app-week',
  standalone: true,
  imports: [CalendarViewComponent],
  templateUrl: './week.component.html',
  styleUrl: './week.component.scss',
})
export class WeekComponent {}
