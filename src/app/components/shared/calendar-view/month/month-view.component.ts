import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MONTHS, WEEK_DAYS } from '../../../../constants/common';
import { getDayByDate, getNoOfDaysInMonth } from '../../../../utils/date';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DayTileComponent } from '../day-tile/day-tile.component';

@Component({
  selector: 'month-view',
  standalone: true,
  imports: [
    MatGridListModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DayTileComponent,
  ],
  templateUrl: './month-view.component.html',
  styleUrl: './month-view.component.scss',
})
export class MonthViewComponent {
  days: string[] = WEEK_DAYS;
  @Input() collection: any[] = [];
  @Input() renderData: any = {};

  users: string[] = [];

  today = new Date();

  onBarClick(date: any) {
    console.log({ date });
  }

  ngOnInit(): void {
    this.users = Object.keys(this.renderData);
  }
}
