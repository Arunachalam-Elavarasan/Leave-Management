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
import { CheckBoxFieldComponent } from '../../../../components/shared/form-fields/check-box-field/check-box-field.component';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../../../store/app/app.action';
import { ScreenHeaderComponent } from '../../../../components/shared/screen-header/screen-header.component';

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
    CheckBoxFieldComponent,
    ScreenHeaderComponent,
  ],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.scss',
  providers: [FormBuilder],
})
export class BasicInfoComponent {
  private api = inject(ApiService);
  private formBuilder = inject(FormBuilder);
  private navigation = inject(NavigationService);
  private store = inject(Store);

  formService = inject(FormService);

  validation = userDetailsValidation;
  editId: any = '';
  isView: boolean = false;

  btnActions = [
    {
      label: 'Apply Leave',
      action: 'applyLeave',
      color: 'accent',
    },
    {
      label: 'Save',
      action: 'save',
      color: 'primary',
    },
    {
      label: 'Cancel',
      action: 'cancel',
      color: 'warn',
    },
  ];

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
    }),
    secondarySameAsPrimary: false,
  });

  ngOnInit(): void {
    const paramId = this.navigation.getQueryParam('id');
    const paramsIsView = this.navigation.getQueryParam('isView');

    this.user.get('secondarySameAsPrimary')?.valueChanges.subscribe((value) => {
      if (value) {
        this.user.patchValue({
          secondaryContactInfo: this.user.get('primaryContactInfo')?.value,
        });
      }
    });

    this.user.get('primaryContactInfo')?.valueChanges.subscribe((value) => {
      if (this.user.get('secondarySameAsPrimary')?.value) {
        this.user.patchValue({
          secondaryContactInfo: this.user.get('primaryContactInfo')?.value,
        });
      }
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

    paramsIsView.subscribe((viewStatus) => {
      if (viewStatus === 'true') {
        this.isView = true;
        this.user.get('status')?.disable();
        this.user.get('secondarySameAsPrimary')?.disable();
      }
    });
  }

  onActionClick(action: string) {
    if (action === 'applyLeave' && this.editId) {
      this.navigation.navigateTo(this.navigation.path.LEAVE_FORM, {
        id: this.editId,
      });
      return;
    }

    action === 'save'
      ? this.onSubmit()
      : this.navigation.navigateTo(this.navigation.path.HOME);
  }

  onSubmit() {
    if (this.user.valid) {
      this.api.service.post(this.api.path.USERS, this.user.value).subscribe({
        next: () => {
          this.store.dispatch(loadUsers());
        },
        error: () => {},
      });
      return;
    }

    console.log(this.user);
  }
}
