import { Component, inject, Input } from '@angular/core';
import { TextFieldComponent } from '../../../../components/shared/form-fields/text-field/text-field.component';
import { CommonModule } from '@angular/common';
import { CheckBoxFieldComponent } from '../../../../components/shared/form-fields/check-box-field/check-box-field.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorPipe } from '../../../../pipes/fieldError/field-error.pipe';
import { userContactInfoValidation } from '../../../../constants/validations';
import { FormService } from '../../../../services/form/form-service.service';

@Component({
  selector: 'contact-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextFieldComponent,
    CheckBoxFieldComponent,
    FieldErrorPipe,
  ],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent {
  @Input() isPrimaryInfo: boolean = true;
  @Input() contactInfoValue!: FormGroup;

  formService = inject(FormService);

  validation = userContactInfoValidation;
}
