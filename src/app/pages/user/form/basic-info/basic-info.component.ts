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
    qualification: this.formBuilder.array([]),
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
    let payload = qualification?.value;
    if (!payload?.id) payload.id = Math.random();
    const qualificationControl = this.user.controls.qualification;
  }

  onSubmit() {
    this.user.controls.primaryContactInfo.markAllAsTouched();
    this.user.controls.secondaryContactInfo.markAllAsTouched();
    if (this.user.invalid) return;
    if (this.action && this.editId) {
      this.api.service
        .put(this.api.path.USERS, this.editId, this.user.value)
        .subscribe({
          next: () => this.onSuccess(),
        });
      return;
    }

    this.api.service.post(this.api.path.USERS, this.user.value).subscribe({
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
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('initialValue');
  }
}
