import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ContactInfoComponent } from '../contact-info/contact-info.component';
import { ScreenHeaderComponent } from '../../../../components/shared/screen-header/screen-header.component';
import { TextFieldComponent } from '../../../../components/shared/form-fields/text-field/text-field.component';
import { ToggleFieldComponent } from '../../../../components/shared/form-fields/toggle-field/toggle-field.component';
import { CheckBoxFieldComponent } from '../../../../components/shared/form-fields/check-box-field/check-box-field.component';

import { routePath } from '../../../../constants/route';
import { loadUsers } from '../../../../store/app/app.action';
import { FormHeaderAction } from '../../../../model/userDetails';
import { ApiService } from '../../../../services/api/api.service';
import { userDetailsValidation } from '../../../../constants/validations';
import { FormService } from '../../../../services/form/form-service.service';
import {
  APPLY_LEAVE,
  applyLeave,
  basicInfo,
  cancel,
  CANCEL,
  contactInfo,
  getScreenTitle,
  saveInfo,
  userDetailsMessage,
  VIEW,
} from '../../../../constants/userDetails';
import { SnackBarService } from '../../../../services/snackBar/snack-bar.service';
import { QualificationComponent } from '../qualification/qualification.component';
import { DateFieldComponent } from '../../../../components/shared/form-fields/date-field/date-field.component';

@Component({
  selector: 'basic-info',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TextFieldComponent,
    ToggleFieldComponent,
    ContactInfoComponent,
    CheckBoxFieldComponent,
    ScreenHeaderComponent,
    QualificationComponent,
    DateFieldComponent,
  ],
  templateUrl: './basic-info.component.html',
  providers: [FormBuilder],
})
export class BasicInfoComponent {
  private store = inject(Store);
  private router = inject(Router);
  private api = inject(ApiService);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(SnackBarService);
  private activatedRoute = inject(ActivatedRoute);

  formService = inject(FormService);

  editId: any = '';
  action: string = '';
  isView: boolean = false;
  validation = userDetailsValidation;
  btnActions: FormHeaderAction[] = [];
  screenTitle: string = '';

  user = this.formBuilder.group({
    ...basicInfo,
    primaryContactInfo: this.formBuilder.group(contactInfo),
    secondaryContactInfo: this.formBuilder.group(contactInfo),
    qualification: this.formBuilder.array<FormGroup<any>>([]),
  });

  getFormGroup(formGroup: AbstractControl | null): FormGroup {
    return formGroup as FormGroup;
  }

  onSuccess() {
    this.snackBar.show({
      message: this.editId
        ? userDetailsMessage?.USER_UPDATED
        : userDetailsMessage?.USER_CREATED,
    });
    this.router.navigate([routePath.HOME]);
    this.store.dispatch(loadUsers());
  }

  onActionClick(action: string) {
    if (action === APPLY_LEAVE && this.editId) {
      this.router.navigate([`${routePath.LEAVE_FORM}/${this.editId}`]);
      return;
    }

    action === CANCEL && this.router.navigate([routePath.HOME]);
  }

  onQualificationSubmit(qualification: any) {
    const editIndex = qualification?.index;
    const payload = qualification?.value;
    const qualificationControl = this.user.controls.qualification;

    if (editIndex?.toString()) {
      qualification?.isUpdate
        ? qualificationControl.at(editIndex)?.patchValue(payload)
        : qualificationControl.removeAt(editIndex);
      return;
    }
    if (!payload?.id) payload.id = Math.random();
    qualificationControl.push(this.formBuilder.group(payload));
  }

  onSubmit() {
    console.log(this.user.controls.dateOfBirth);
    this.user.controls.primaryContactInfo.markAllAsTouched();
    this.user.controls.secondaryContactInfo.markAllAsTouched();
    if (this.user.invalid) return;
    const payload = {
      ...this.user.value,
      ...(this.user.controls.status.value ? { deactivationReason: '' } : {}),
    };
    if (this.action && this.editId) {
      this.api.service
        .put(this.api.path.USERS, this.editId, payload)
        .subscribe({
          next: () => this.onSuccess(),
        });
      return;
    }

    this.api.service.post(this.api.path.USERS, payload).subscribe({
      next: () => this.onSuccess(),
    });
  }

  ngOnInit(): void {
    this.action = this.activatedRoute.snapshot.params['action'];
    this.editId = this.activatedRoute.snapshot.params['id'];

    if (this.action === VIEW) {
      this.isView = true;
      this.user.get('secondarySameAsPrimary')?.disable();
      this.user.get('status')?.disable();
    }

    this.btnActions = [
      ...(this?.editId ? applyLeave : []),
      ...saveInfo(!this.editId, this.isView),
      cancel,
    ];

    this.screenTitle = getScreenTitle(this.isView, !!this.editId);

    if (this.editId) {
      this.api.service.get(this.api.path.USERS, this.editId).subscribe({
        next: (data: any) => {
          this.user.patchValue(data || {});
          const qualification = this.user.controls.qualification;
          if (data?.qualification?.length) {
            data?.qualification?.forEach((item: any) => {
              qualification.push(this.formBuilder.group(item));
            });
          }
        },
      });
    }

    if (!this.editId) {
      const initialValue = sessionStorage.getItem('initialValue');

      initialValue && this.user.patchValue(JSON.parse(initialValue));

      this.user.valueChanges.subscribe((userValue) => {
        sessionStorage.setItem('initialValue', JSON.stringify(userValue));
      });
    }

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

    this.user.controls.status.valueChanges.subscribe((value) => {
      const deactivation = this.user.controls.deactivationReason;
      !value && deactivation.setValidators([Validators.required]);
      value && deactivation.clearValidators();
      deactivation.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('initialValue');
  }
}
