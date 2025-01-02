import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControlPipe } from '../../../../pipes/formControl/form-control.pipe';

type labelPosition = 'before' | 'after';

@Component({
  selector: 'toggle-field',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormControlPipe,
  ],
  templateUrl: './toggle-field.component.html',
  styleUrl: './toggle-field.component.scss',
})
export class ToggleFieldComponent {
  @Input() label: string = '';
  @Input() labelPosition: labelPosition = 'after';
  @Input() control!: AbstractControl | null;
}
