import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormFieldModule,
  MatFormFieldAppearance,
} from '@angular/material/form-field';
import { map, Observable, startWith } from 'rxjs';

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
  @Input() isAutoComplete: boolean = true;
  @Output() onChange = new EventEmitter<any>();

  formControl = new FormControl();
  filteredOptions: any[] = [];
  selectOption!: any;

  onInputChange(event: any) {
    const searchValue = event?.target?.value?.toLocaleLowerCase();
    this.filteredOptions = this.options.filter((option) =>
      String(option?.[this.optionLabelKey] || '')
        ?.toLocaleLowerCase()
        ?.includes(searchValue)
    );
  }

  onOptionChange(value: any) {
    this.selectOption = value;
    this.onChange.emit(value);
  }

  ngOnInit(): void {
    this.filteredOptions = this.options;
  }
}
