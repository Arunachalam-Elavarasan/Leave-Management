import { Component, inject, input } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { Store } from '@ngrx/store';
import { TablePaginationExample } from '../../../components/shared/app-table/app-table.component';
import { NavigationService } from '../../../services/navigation/navigation.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/shared/confirm-dialog/confirm-dialog.component';
import { loadUsers } from '../../../store/app/app.action';
import { SnackBarService } from '../../../services/snackBar/snack-bar.service';

const tableColumn = [
  {
    label: 'First Name',
    accessor: 'firstName',
  },
  {
    label: 'Last Name',
    accessor: 'lastName',
  },
  {
    label: 'Email',
    accessor: 'email',
  },
  {
    label: 'Phone No',
    accessor: 'phoneNo',
  },
];

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [TablePaginationExample],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private api = inject(ApiService);
  private store = inject(Store);
  private navigation = inject(NavigationService);
  private dialog = inject(MatDialog);
  private snackBar = inject(SnackBarService);

  deleteId = '';

  columnData = tableColumn;

  users: any[] = [];

  ngOnInit(): void {
    this.store.subscribe({
      next: (value: any) => {
        console.log(value?.app?.users);
        this.users = [...(value?.app?.users || [])];
      },
    });
  }

  onConfirm(): void {
    this.api.service.delete(this.api.path.USERS, this.deleteId).subscribe({
      next: (value) => {
        this.store.dispatch(loadUsers());
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openDialog(): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '60%',
      maxWidth: '600px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '400ms',
      data: {
        title: 'Delete User',
        confirmMessage: 'Are you sure Do you want to delete this User?',
        onConfirm: this.onConfirm.bind(this),
      },
    });
  }

  onActionClick(values: any) {
    if (values?.action === 'delete') {
      this.deleteId = values?.item?.id;
      this.openDialog();
      return;
    }
    this.navigation.navigateTo(this.navigation.path.USER_FORM, {
      id: values?.item?.id,
      isEdit: values?.action === 'edit',
    });
  }

  onAddClick() {
    // this.navigation.navigateTo(this.navigation.path.USER_FORM);
    this.snackBar.showSnackBar({ message: 'Hello Arunachalm' });
  }
}
