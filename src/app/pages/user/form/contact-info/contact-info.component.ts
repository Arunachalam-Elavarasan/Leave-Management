import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextFieldComponent } from '../../../../components/shared/form-fields/text-field/text-field.component';

import { FormService } from '../../../../services/form/form-service.service';
import { userContactInfoValidation } from '../../../../constants/validations';

@Component({
  selector: 'contact-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TextFieldComponent],
  templateUrl: './contact-info.component.html',
})
export class ContactInfoComponent {
  @Input() isPrimaryInfo: boolean = true;
  @Input() contactInfoValue!: FormGroup;
  @Input() isReadOnly: boolean = false;

  formService = inject(FormService);

  validation = userContactInfoValidation;
}
