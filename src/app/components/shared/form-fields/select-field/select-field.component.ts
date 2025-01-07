import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormFieldModule,
  MatFormFieldAppearance,
} from '@angular/material/form-field';

@Component({
  selector: 'select-field',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
  ],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss',
})
export class SelectFieldComponent {
  @Input() label!: string;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() control!: AbstractControl | null;
  @Input() options: any[] = [];
  @Input() optionLabelKey!: string;
  @Output() onChange = new EventEmitter<any>();

  selectOption!: any;

  onOptionChange(value: any) {
    this.selectOption = value;
    this.onChange.emit(value);
  }
}
