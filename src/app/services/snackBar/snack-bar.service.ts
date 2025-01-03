import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../components/shared/snack-bar/snack-bar.component';

declare type SnackBarConfig = {
  message: string;
  action?: string;
  duration?: number;
  isSuccess?: boolean;
  verticalPosition?: MatSnackBarVerticalPosition;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  data?: any;
};

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar({
    message = '',
    action = 'Close',
    duration = 200000,
    isSuccess = true,
    verticalPosition = 'top',
    horizontalPosition = 'center',
    data,
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
}
