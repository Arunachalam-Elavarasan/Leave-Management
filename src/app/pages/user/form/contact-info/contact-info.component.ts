import { Component, Input } from '@angular/core';
import { TextFieldComponent } from '../../../../components/shared/form-fields/text-field/text-field.component';
import { CommonModule } from '@angular/common';
import { CheckBoxFieldComponent } from '../../../../components/shared/form-fields/check-box-field/check-box-field.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormControlPipe } from '../../../../pipes/formControl/form-control.pipe';

@Component({
  selector: 'contact-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextFieldComponent,
    CheckBoxFieldComponent,
    FormControlPipe,
  ],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent {
  @Input() isPrimaryInfo: boolean = true;
  @Input() contactInfoValue!: FormGroup;
}
