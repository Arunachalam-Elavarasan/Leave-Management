import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    MatIconModule,
    MatButtonModule,
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
  @Output() onOptionChange = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();

  @ViewChild('inputField', { static: true }) inputField!: ElementRef;

  formControl = new FormControl();
  filteredOptions: any[] = [];
  selectOption!: any;

  getOption(value: any): string {
    return this.optionLabelKey ? value?.[this.optionLabelKey] : '';
  }

  onInputChange(event: any) {
    const value = event?.target?.value?.toLocaleLowerCase();
    this.onChange.emit(value);
    this.filteredOptions = this.options.filter((option) =>
      String(option?.[this.optionLabelKey] || '')
        ?.toLocaleLowerCase()
        ?.includes(value)
    );
  }

  onClear() {
    this.inputField.nativeElement.value = '';
    this.onOptionChange.emit('');
  }

  onOptionSelect(value: any) {
    this.selectOption = value;
    this.onOptionChange.emit(value);

    if (this.inputField) {
      setTimeout(() => {
        this.inputField && this.inputField.nativeElement.blur();
      }, 50);
    }
  }

  ngOnInit(): void {
    this.filteredOptions = this.options;
  }
}
