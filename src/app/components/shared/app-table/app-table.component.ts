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
  @Input() hasAction: boolean = true;

  @Output() onActionClick = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [];

  ngOnInit() {
    this.displayedColumns = this.columnData?.map((item) => item?.accessor);
  }

  ngAfterViewInit() {
    console.log(this.paginator);
    this.data.paginator = this.paginator;
  }

  handleActionClick(action: string, item: any) {
    this.onActionClick.emit({ action, item });
  }
}
