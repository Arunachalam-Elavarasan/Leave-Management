import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() options: any[] = [
    { label: 'Select option 1', value: 1 },
    { label: 'Select option 2', value: 2 },
    { label: 'Select option 3', value: 3 },
    { label: 'Select option 4', value: 4 },
  ];
}
