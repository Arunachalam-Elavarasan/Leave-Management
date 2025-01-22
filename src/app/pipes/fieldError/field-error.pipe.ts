import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'fieldError',
  standalone: true,
})
export class FieldErrorPipe implements PipeTransform {
  transform(
    control: AbstractControl | null,
    fieldName: string,
    validation: any
  ): string {
    const errors = control?.errors;
    if (!errors) return '';

    const firstErrorKey = Object.keys(errors)[0];
    return validation?.[fieldName]?.[firstErrorKey] || '';
  }
}
