import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

type labelPosition = 'before' | 'after';

@Component({
  selector: 'toggle-field',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSlideToggleModule],
  templateUrl: './toggle-field.component.html',
  styleUrl: './toggle-field.component.scss',
})
export class ToggleFieldComponent {
  @Input() label: string = '';
  @Input() labelPosition: labelPosition = 'after';
  @Input() control!: FormControl;
}
