import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../components/shared/dialog/dialog.component';

type dialogWidth = '40%' | '50%' | '60%' | '70%' | '80%' | '90%' | '100%';
type animationDuration = '200ms' | '400ms' | '600ms' | '800ms' | '1000ms';

export type DialogConfig = {
  width: dialogWidth;
  enterAnimationDuration: animationDuration;
  exitAnimationDuration: animationDuration;
};

export type DialogData = {
  title: string;
  message: string;
  cancelBtn: {
    label: string;
    color: string;
  };
  submitBtn: {
    label: string;
    color: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(MatDialog);

  open(config: DialogConfig, data: DialogData, onConfirm: Function) {
    this.dialog.open(DialogBoxComponent, {
      ...config,
      data: {
        ...data,
        onConfirm,
      },
    });
  }
}
