import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  fieldError = (
    control: AbstractControl | null,
    fieldName: string,
    validation: any
  ) => {
    const errors = control?.errors;
    if (!errors) return '';

    const firstErrorKey = Object.keys(errors)[0];
    return validation?.[fieldName]?.[firstErrorKey] || '';
  };
}
