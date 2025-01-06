import { Store } from '@ngrx/store';
import { Component, inject } from '@angular/core';

import { SnackBarService } from '../../../services/snackBar/snack-bar.service';
import { TablePaginationExample } from '../../../components/shared/app-table/app-table.component';
import { ScreenHeaderComponent } from '../../../components/shared/screen-header/screen-header.component';

import { UserListItem } from '../../../model/userDetails';
import { loadUsers } from '../../../store/app/app.action';
import { ApiService } from '../../../services/api/api.service';
import { HeaderActions, TableAction } from '../../../model/common';
import { NavigationService } from '../../../services/navigation/navigation.service';
import {
  DialogConfig,
  DialogData,
  DialogService,
} from '../../../services/dialog/dialog.service';
import {
  userDetailsList,
  userDialogConfig,
  userDialogData,
  userHeaderAction,
} from '../../../constants/userDetails';
import { getUsers } from '../../../store/app/app.selector';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [TablePaginationExample, ScreenHeaderComponent],
  templateUrl: './list.component.html',
})
export class ListComponent {
  private store = inject(Store);
  private api = inject(ApiService);
  private dialog = inject(DialogService);
  private snackBar = inject(SnackBarService);

  users: any[] = [];
  deleteId: string = '';
  navigation = inject(NavigationService);
  columnData: UserListItem[] = userDetailsList;
  headerActions: HeaderActions = userHeaderAction;
  dialogConfig: DialogConfig = userDialogConfig;
  dialogData: DialogData = userDialogData;

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
    this.dialog.open(
      this.dialogConfig,
      this.dialogData,
      this.onConfirm.bind(this)
    );
  }

  onActionClick(values: TableAction) {
    if (values?.action === 'delete') {
      this.deleteId = values?.item?.id;
      this.openDialog();
      return;
    }
    this.navigation.navigateTo(this.navigation.path.USER_FORM, {
      id: values?.item?.id,
      isView: values?.action === 'view',
    });
  }

  ngOnInit(): void {
    this.store.select(getUsers).subscribe({
      next: (state) => {
        this.users = [...state];
      },
    });
  }
}
