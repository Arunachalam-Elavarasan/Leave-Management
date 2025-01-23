import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';

type Item = {
  date: Date;
  isDisabled: boolean;
};
@Component({
  selector: 'day-tile',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatTooltipModule],
  templateUrl: './day-tile.component.html',
  styleUrl: './day-tile.component.scss',
})
export class DayTileComponent {
  @Input() item!: Item;
  @Input() users: string[] = [];
  @Input() renderData: any = {};
  @Input() maxBarPerCell: number = 3;

  @Output() onBarClick = new EventEmitter<any>();

  cellDate!: string;
  previousDate: string = new Date()?.toString();
  collection: any[] = [];
  preDateCollection: any = {};

  getPosition(index: number): string {
    return (index ? index * 20 + 20 : 20) + 'px';
  }

  ngOnInit(): void {
    if (!this.item?.isDisabled) {
      const date = new Date(this.item?.date);
      this.cellDate = date?.toDateString();
      if (this.renderData?.[date?.toDateString()]) {
        this.collection = Object.values(
          this.renderData?.[date?.toDateString()]
        );
      }
    }
  }
}
