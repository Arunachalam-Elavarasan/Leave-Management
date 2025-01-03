import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [MatSnackBarModule, MatIconModule, CommonModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
})
export class SnackBarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<SnackBarComponent>
  ) {}
}
