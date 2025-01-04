import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  styleUrl: './app-table.component.scss',
  templateUrl: './app-table.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class TablePaginationExample {
  @Input() columnData: any[] = [];
  @Input() data!: any;
  @Input() emptyMessage: string = 'No Data Found';
  @Input() hasPagination: boolean = true;
  @Input() isPaginationDisabled: boolean = false;
  @Input() hasPageSize: boolean = true;
  @Input() hasFirstLastButton: boolean = true;
  @Input() pageOptions: number[] = [5, 10, 15];

  @Output() onActionClick = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [];
  dataSource: any;

  ngOnInit(): void {
    this.displayedColumns = this.columnData?.map((item) => item?.accessor);
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit(): void {
    if (this.hasPagination) {
      this.dataSource.paginator = this.paginator;
    }
  }

  handleActionClick(action: string, item: any) {
    this.onActionClick.emit({ action, item });
  }
}
