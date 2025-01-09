import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function checkEndDateValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (!startDate || !endDate) return null;
    const isInvalid = new Date(startDate) > new Date(endDate);

    return isInvalid ? { endDate: true } : null;
  };
}
