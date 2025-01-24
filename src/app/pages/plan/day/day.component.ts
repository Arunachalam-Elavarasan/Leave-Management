import { Component } from '@angular/core';
import { CalendarViewComponent } from "../../../components/shared/calendar-view/calendar-view.component";

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [CalendarViewComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent {

}
