import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../components/shared/snack-bar/snack-bar.component';
import { getErrorMessage } from '../../utils/common';

declare type SnackBarConfig = {
  message?: string;
  action?: string;
  duration?: number;
  isSuccess?: boolean;
  verticalPosition?: MatSnackBarVerticalPosition;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  data?: any;
  error?: any;
};

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar({
    message = '',
    action = 'Close',
    duration = 2000,
    isSuccess = true,
    verticalPosition = 'top',
    horizontalPosition = 'center',
  }: SnackBarConfig) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration,
      verticalPosition,
      horizontalPosition,
      panelClass: 'success',
      data: {
        message,
        action,
        isSuccess,
      },
    });
  }

  showApiError({
    action = 'Close',
    duration = 2000,
    isSuccess = true,
    verticalPosition = 'top',
    horizontalPosition = 'center',
    error,
  }: SnackBarConfig) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration,
      verticalPosition,
      horizontalPosition,
      panelClass: 'success',
      data: {
        message: getErrorMessage(error),
        action,
        isSuccess,
      },
    });
  }
}
