import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControlPipe } from '../../../../pipes/formControl/form-control.pipe';
import { CommonModule } from '@angular/common';

type labelPosition = 'before' | 'after';

@Component({
  selector: 'toggle-field',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormControlPipe,
    CommonModule,
  ],
  templateUrl: './toggle-field.component.html',
  styleUrl: './toggle-field.component.scss',
})
export class ToggleFieldComponent {
  @Input() label: string = '';
  @Input() labelPosition: labelPosition = 'after';
  @Input() control!: AbstractControl | null;
  @Input() name!: string;
  @Input() checked!: boolean;

  @Output() onChange = new EventEmitter<any>();
}
