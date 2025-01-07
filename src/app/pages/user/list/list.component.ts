import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  Component,
  inject,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';

import { TablePaginationExample } from '../../../components/shared/app-table/app-table.component';
import { ScreenHeaderComponent } from '../../../components/shared/screen-header/screen-header.component';
import { ToggleFieldComponent } from '../../../components/shared/form-fields/toggle-field/toggle-field.component';

import { routePath } from '../../../constants/route';
import { UserListItem } from '../../../model/userDetails';
import { loadUsers } from '../../../store/app/app.action';
import { getUsers } from '../../../store/app/app.selector';
import { ApiService } from '../../../services/api/api.service';
import { HeaderActions, TableAction } from '../../../model/common';
import { DialogService } from '../../../services/dialog/dialog.service';
import {
  userDetailsList,
  userDetailsMessage,
  userDialogConfig,
  userDialogData,
  userHeaderAction,
  userStatusItem,
} from '../../../constants/userDetails';
import { SnackBarService } from '../../../services/snackBar/snack-bar.service';
import { messages } from '../../../constants/contents';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [
    TablePaginationExample,
    ScreenHeaderComponent,
    ToggleFieldComponent,
  ],
  templateUrl: './list.component.html',
})
export class ListComponent {
  private store = inject(Store);
  private router = inject(Router);
  private api = inject(ApiService);
  private dialog = inject(DialogService);
  private changeDetection = inject(ChangeDetectorRef);
  private snackBar = inject(SnackBarService);

  @ViewChild('userStatus') userStatusField!: TemplateRef<any>;

  users: any[] = [];
  deleteId: string = '';
  columnData: UserListItem[] = userDetailsList;
  headerActions: HeaderActions = userHeaderAction;
  userDetailsForm: string = routePath.USER_FORM;

  onError(error: any) {
    this.snackBar.showApiError({ error });
  }

  onConfirm(): void {
    this.api.service.delete(this.api.path.USERS, this.deleteId).subscribe({
      next: (value) => {
        this.store.dispatch(loadUsers());
      },
      error: (err) => this.onError(err),
    });
  }

  onActionClick(values: TableAction) {
    if (values?.action === 'delete') {
      this.deleteId = values?.item?.id;
      this.dialog.open(
        userDialogConfig,
        userDialogData,
        this.onConfirm.bind(this)
      );
      return;
    }

    this.router.navigate([
      `${routePath.USER_FORM}/${values?.action}/${values?.item?.id}`,
    ]);
  }

  onStatusChange(user: any, status: boolean) {
    if (!user?.id) return;
    this.api.service
      .put(this.api.path.USERS, user?.id, { ...user, status })
      .subscribe({
        next: (value: any) => {
          this.store.dispatch(loadUsers());
          this.snackBar.showSnackBar({
            message: userDetailsMessage?.STATUS_CHANGED(value?.status),
          });
        },
        error: (error: any) => this.onError(error),
      });
  }

  ngOnInit(): void {
    this.store.select(getUsers).subscribe({
      next: (state) => {
        this.users = [...state];
      },
    });
  }

  ngAfterViewInit(): void {
    if (this.userStatusField) {
      this.columnData = [
        ...this.columnData?.slice(0, this.columnData.length - 1),
        userStatusItem(this.userStatusField),
        ...this.columnData?.slice(this.columnData.length - 1),
      ];
      this.changeDetection.detectChanges();
    }
  }
}
