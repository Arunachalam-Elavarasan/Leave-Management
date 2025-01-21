import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TextFieldComponent } from '../../../../components/shared/form-fields/text-field/text-field.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AppTable } from '../../../../components/shared/app-table/app-table.component';
import { CommonModule } from '@angular/common';

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
  @Input() qualifications: any = [];
  @Output() onSubmit = new EventEmitter<any>();

  formBuilder = inject(FormBuilder);

  editIndex: string = '';

  columnData = [
    {
      label: 'Qualification',
      accessor: 'qualification',
    },
    {
      label: 'Percentage',
      accessor: 'percentage',
    },
    {
      label: 'Actions',
      accessor: 'actions',
      actions: [
        {
          iconName: 'edit',
          iconColor: 'primary',
          name: 'edit',
        },
        {
          iconName: 'delete',
          iconColor: 'warn',
          name: 'delete',
        },
      ],
    },
  ];

  userQualification = this.formBuilder.group({
    qualification: [''],
    percentage: [''],
  });

  onQualificationSubmit() {
    this.onSubmit.emit({
      value: this.userQualification.value,
      index: this.editIndex,
    });
    this.userQualification.reset();
    this.editIndex = '';
  }

  onActionClick(event: any) {
    if (event?.action === 'edit') {
      this.editIndex = event?.index;
    }
  }
}
