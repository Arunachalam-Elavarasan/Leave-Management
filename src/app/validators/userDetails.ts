import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function userDateOfBirth(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = new Date(control.value);
    const today = new Date();
    return value > today ? { moreThanToday: true } : null;
  };
}
