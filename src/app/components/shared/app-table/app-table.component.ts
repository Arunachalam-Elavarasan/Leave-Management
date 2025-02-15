import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
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
export class AppTable {
  @Input() columnData: any[] = [];
  @Input() data: any[] = [];
  @Input() emptyMessage: string = 'No Data Found';
  @Input() hasPagination: boolean = true;
  @Input() isPaginationDisabled: boolean = false;
  @Input() hidePageSize: boolean = false;
  @Input() hasFirstLastButton: boolean = true;
  @Input() pageOptions: number[] = [5, 10, 15];
  @Input() isActionDisabled: boolean = false;

  @Output() onActionClick = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [];
  columnSchema: any[] = [];
  dataSource: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['data']) {
      this.dataSource = new MatTableDataSource(changes['data']?.currentValue);
    }
    if (changes?.['columnData']) {
      this.columnSchema = [...this.columnData];
      this.displayedColumns = this.columnData?.map((item) => item?.accessor);
    }
  }

  ngAfterViewInit(): void {
    if (this.hasPagination) {
      this.dataSource.paginator = this.paginator;
    }
  }

  handleActionClick(action: string, item: any, index: number) {
    this.onActionClick.emit({ action, item, index });
  }
}
