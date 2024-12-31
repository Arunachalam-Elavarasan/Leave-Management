import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'formControl',
  standalone: true,
})
export class FormControlPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value);
    return new FormControl(value);
  }
}
