import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component, Input } from '@angular/core';

type labelPosition = 'before' | 'after';

@Component({
  selector: 'check-box-field',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './check-box-field.component.html',
  styleUrl: './check-box-field.component.scss',
})
export class CheckBoxFieldComponent {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() labelPosition: labelPosition = 'after';
}
