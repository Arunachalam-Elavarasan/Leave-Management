import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { TextFieldComponent } from '../../../../components/shared/form-fields/text-field/text-field.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AppTable } from '../../../../components/shared/app-table/app-table.component';
import { CommonModule } from '@angular/common';
import {
  qualificationInitialValue,
  qualificationTableSchema,
} from '../../../../constants/userDetails';
import { FormService } from '../../../../services/form/form-service.service';
import { userQualificationValidation } from '../../../../constants/validations';

@Component({
  selector: 'qualification',
  standalone: true,
  imports: [
    TextFieldComponent,
    MatButtonModule,
    AppTable,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './qualification.component.html',
  styleUrl: './qualification.component.scss',
})
export class QualificationComponent {
  @Input() qualifications: any[] = [];
  @Input() readonly: boolean = false;
  @Output() onSubmit = new EventEmitter<any>();

  editIndex: string = '';
  formBuilder = inject(FormBuilder);
  formService = inject(FormService);
  isActionDisabled: boolean = this.readonly;
  columnData = qualificationTableSchema;
  userQualification = this.formBuilder.group(qualificationInitialValue);
  validation = userQualificationValidation;

  onQualificationSubmit() {
    this.userQualification.markAllAsTouched();
    if (this.userQualification.invalid) return;

    this.onSubmit.emit({
      value: this.userQualification.value,
      index: this.editIndex,
      isUpdate: !!this.editIndex?.toString(),
    });
    this.userQualification.reset();
    this.editIndex = '';
  }

  onClear() {
    this.userQualification.reset();
    this.editIndex = '';
    this.isActionDisabled = false;
  }

  onActionClick(event: any) {
    if (event?.action === 'edit') {
      this.editIndex = event?.index;
      this.userQualification.patchValue(event?.item);
      this.isActionDisabled = true;
      return;
    }

    this.onSubmit.emit({
      index: event?.index,
      isUpdate: false,
    });
  }
}
