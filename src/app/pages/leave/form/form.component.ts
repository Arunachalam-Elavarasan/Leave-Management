import { Component, inject } from '@angular/core';
import { ScreenHeaderComponent } from '../../../components/shared/screen-header/screen-header.component';
import { TextFieldComponent } from '../../../components/shared/form-fields/text-field/text-field.component';
import { FormBuilder, Validators } from '@angular/forms';
import { DateFieldComponent } from '../../../components/shared/form-fields/date-field/date-field.component';

@Component({
  selector: 'leave-form',
  standalone: true,
  imports: [ScreenHeaderComponent, TextFieldComponent, DateFieldComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  actions = [
    {
      label: 'Save',
      action: 'save',
      color: 'primary',
    },
    {
      label: 'Cancel',
      action: 'cancel',
      color: 'accent',
    },
  ];

  formBuilder = inject(FormBuilder);

  leaveValue = this.formBuilder.group({
    typeOfLeave: ['', Validators.required],
    comment: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });
}
