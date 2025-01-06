import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component, Input } from '@angular/core';
import { FormControlPipe } from '../../../../pipes/formControl/form-control.pipe';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

type labelPosition = 'before' | 'after';

@Component({
  selector: 'check-box-field',
  standalone: true,
  imports: [
    MatCheckboxModule,
    FormControlPipe,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './check-box-field.component.html',
  styleUrl: './check-box-field.component.scss',
})
export class CheckBoxFieldComponent {
  @Input() label: string = '';
  @Input() labelPosition: labelPosition = 'after';
  @Input() control!: AbstractControl | null;
}
