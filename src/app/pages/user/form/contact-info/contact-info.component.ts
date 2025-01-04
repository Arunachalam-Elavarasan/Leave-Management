import { Component, inject, Input } from '@angular/core';
import { TextFieldComponent } from '../../../../components/shared/form-fields/text-field/text-field.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { userContactInfoValidation } from '../../../../constants/validations';
import { FormService } from '../../../../services/form/form-service.service';

@Component({
  selector: 'contact-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TextFieldComponent],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent {
  @Input() isPrimaryInfo: boolean = true;
  @Input() contactInfoValue!: FormGroup;
  @Input() isReadOnly: boolean = false;

  formService = inject(FormService);

  validation = userContactInfoValidation;
}
