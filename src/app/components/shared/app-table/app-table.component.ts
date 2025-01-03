import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-table',
  styleUrl: './app-table.component.scss',
  templateUrl: './app-table.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
})
export class TablePaginationExample {
  @Input() columnData: any[] = [];
  @Input() data: any[] = [];
  @Input() emptyMessage: string = 'No Data Found';
  @Input() hasAction: boolean = true;
  @Input() canView: boolean = true;
  @Input() canEdit: boolean = true;
  @Input() canDelete: boolean = true;

  @Output() onActionClick = new EventEmitter<any>();

  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = this.columnData?.map((item) => item?.accessor);
  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.columnData);
  }
}
