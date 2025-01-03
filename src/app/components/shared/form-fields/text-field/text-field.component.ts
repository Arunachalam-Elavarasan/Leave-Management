import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlPipe } from '../../../../pipes/formControl/form-control.pipe';

@Component({
  selector: 'text-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    FormControlPipe,
  ],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
})
export class TextFieldComponent {
  @Input() control!: AbstractControl | null;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() error: string | null = null;
  @Input() isTextArea: boolean = false;

  ngOnInit(): void {
    console.log(this.disabled);
  }
}
