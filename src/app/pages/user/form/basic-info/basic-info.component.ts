import { Component, inject, Input } from '@angular/core';
import { TextFieldComponent } from '../../../../components/shared/form-fields/text-field/text-field.component';
import { ContactInfoComponent } from '../contact-info/contact-info.component';
import { ToggleFieldComponent } from '../../../../components/shared/form-fields/toggle-field/toggle-field.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormGroupPipe } from '../../../../pipes/formGroup/form-group.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'basic-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TextFieldComponent,
    ToggleFieldComponent,
    ContactInfoComponent,
    FormGroupPipe,
    CommonModule,
  ],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.scss',
  providers: [FormBuilder],
})
export class BasicInfoComponent {
  private formBuilder = inject(FormBuilder);

  @Input() isUpdate: boolean = false;

  user = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    status: true,
    primaryContactInfo: this.formBuilder.group({
      address: '',
      street: '',
      city: '',
      state: '',
      pinCode: '',
    }),
    secondaryContactInfo: this.formBuilder.group({
      address: '',
      street: '',
      city: '',
      state: '',
      pinCode: '',
      sameAsPrimary: false,
    }),
  });

  get primaryContactInfo(): FormGroup {
    return this.user.get('primaryContactInfo') as FormGroup;
  }

  onSubmit() {
    console.log(this.user.value);
  }
}
