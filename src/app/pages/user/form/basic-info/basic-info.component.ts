import { Component, inject, Input } from '@angular/core';
import { TextFieldComponent } from '../../../../components/shared/form-fields/text-field/text-field.component';
import { ContactInfoComponent } from '../contact-info/contact-info.component';
import { ToggleFieldComponent } from '../../../../components/shared/form-fields/toggle-field/toggle-field.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormControlPipe } from '../../../../pipes/formControl/form-control.pipe';

@Component({
  selector: 'basic-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TextFieldComponent,
    ContactInfoComponent,
    ToggleFieldComponent,
    FormControlPipe,
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

  onSubmit() {
    console.log(this.user.value);
  }
}
