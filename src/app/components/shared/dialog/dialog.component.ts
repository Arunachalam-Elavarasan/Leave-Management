import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-box',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogBoxComponent {
  inputData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogBoxComponent>
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;

    console.log(this.data);
  }

  onClose() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.inputData?.onConfirm) {
      this?.inputData?.onConfirm();
    }
    this.onClose();
  }
}
