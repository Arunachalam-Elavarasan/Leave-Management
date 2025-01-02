import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './app-table.component.html',
  styleUrl: './app-table.component.scss',
})
export class AppTableComponent {
  @Input() columnData: any[] = [];
  @Input() data: any[] = [];
  @Input() emptyMessage: string = 'No Data Found';
  @Input() hasAction: boolean = true;
  @Input() canEdit: boolean = true;
  @Input() canView: boolean = true;
  @Input() canDelete: boolean = true;
  @Output() onActionClick = new EventEmitter<any>();

  onClick(action: string, item: any) {
    this.onActionClick.emit({ action, item });
  }
}
