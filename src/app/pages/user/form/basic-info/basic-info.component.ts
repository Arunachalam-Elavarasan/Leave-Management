import { Component, inject, Input } from '@angular/core';
import { TextFieldComponent } from '../../../../components/shared/form-fields/text-field/text-field.component';
import { ContactInfoComponent } from '../contact-info/contact-info.component';
import { ToggleFieldComponent } from '../../../../components/shared/form-fields/toggle-field/toggle-field.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormGroupPipe } from '../../../../pipes/formGroup/form-group.pipe';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { ApiService } from '../../../../services/api/api.service';
import { userDetailsValidation } from '../../../../constants/validations';
import { FormService } from '../../../../services/form/form-service.service';

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
  private api = inject(ApiService);
  private formBuilder = inject(FormBuilder);
  private navigation = inject(NavigationService);

  formService = inject(FormService);

  validation = userDetailsValidation;
  editId: any = '';
  isEdit: boolean = false;

  user = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNo: ['', [Validators.required, Validators.minLength(10)]],
    status: true,
    primaryContactInfo: this.formBuilder.group({
      address: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pinCode: ['', [Validators.required, Validators.minLength(6)]],
    }),
    secondaryContactInfo: this.formBuilder.group({
      address: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pinCode: ['', [Validators.required, Validators.minLength(6)]],
      sameAsPrimary: false,
    }),
  });

  ngOnInit(): void {
    const paramId = this.navigation.getQueryParam('id');
    const paramsIsEdit = this.navigation.getQueryParam('isEdit');

    this.user
      .get('secondaryContactInfo.sameAsPrimary')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.user.patchValue({
            secondaryContactInfo: this.user.get('primaryContactInfo')?.value,
          });
        }
      });

    this.user.get('primaryContactInfo')?.valueChanges.subscribe((value) => {
      if (this.user.get('secondaryContactInfo.sameAsPrimary')?.value) {
        this.user.patchValue({
          secondaryContactInfo: this.user.get('primaryContactInfo')?.value,
        });
      }
      console.log(value);
    });

    paramId.subscribe((id) => {
      this.editId = id;
      if (id) {
        this.api.service.get(this.api.path.USERS, id).subscribe({
          next: (data) => {
            this.user.patchValue({ ...(data || {}) });
          },
          error: (err) => console.log(err),
        });
      }
    });

    paramsIsEdit.subscribe((editStatus) => {
      this.isEdit = editStatus === 'true';
    });
  }

  onSubmit() {
    console.log(this.user);
  }
}
