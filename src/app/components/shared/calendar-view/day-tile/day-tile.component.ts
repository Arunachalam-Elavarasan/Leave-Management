import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'day-tile',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatTooltipModule],
  templateUrl: './day-tile.component.html',
  styleUrl: './day-tile.component.scss',
})
export class DayTileComponent {
  @Input() item: any = {};
  @Input() users: string[] = [];
  @Input() renderData: any = {};
  @Input() maxBarPerCell: number = 3;

  @Output() onBarClick = new EventEmitter<any>();
}
