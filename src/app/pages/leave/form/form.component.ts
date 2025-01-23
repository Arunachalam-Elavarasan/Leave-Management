import { Store } from '@ngrx/store';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { ScreenHeaderComponent } from '../../../components/shared/screen-header/screen-header.component';
import { TextFieldComponent } from '../../../components/shared/form-fields/text-field/text-field.component';
import { DateFieldComponent } from '../../../components/shared/form-fields/date-field/date-field.component';

import { routePath } from '../../../constants/route';
import { CANCEL } from '../../../constants/userDetails';
import { ListHeaderAction } from '../../../model/common';
import { ApiService } from '../../../services/api/api.service';
import { loadLeaveDetails } from '../../../store/app/app.action';
import {
  ErrorMatcher,
  leaveDetailsValidation,
} from '../../../constants/validations';
import { FormService } from '../../../services/form/form-service.service';
import {
  formatPlural,
  getDurationBetweenTwoDates,
} from '../../../utils/common';
import {
  LEAVE_APPLIED,
  LEAVE_EXIST,
  leaveFormActions,
  leaveInitialValues,
} from '../../../constants/userLeaves';
import { SnackBarService } from '../../../services/snackBar/snack-bar.service';
import { checkEndDateValidation } from '../../../validators/leaveDetails';
import { getLeaves } from '../../../store/app/app.selector';

@Component({
  selector: 'leave-form',
  standalone: true,
  imports: [
    ScreenHeaderComponent,
    TextFieldComponent,
    DateFieldComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [FormService],
})
export class FormComponent {
  private store = inject(Store);
  private router = inject(Router);
  private api = inject(ApiService);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(SnackBarService);
  private activatedRoute = inject(ActivatedRoute);
  formService = inject(FormService);

  leaves: any[] = [];
  userDetails!: any[];
  userId: string = '';
  actions: ListHeaderAction[] = leaveFormActions;
  validation = leaveDetailsValidation;
  errorStateMatcher = new ErrorMatcher();
  leaveDetails: FormGroup = this.formBuilder.group(leaveInitialValues, {
    validators: checkEndDateValidation(),
  });

  onActionClick(action: any) {
    action === CANCEL && this.router.navigate([routePath.LEAVE_LIST]);
  }

  checkLeaveExist() {
    const appliedStartDate = this.leaveDetails.get('startDate')?.value;
    const appliedEndDate = this.leaveDetails.get('endDate')?.value;

    return this.leaves?.reduce((acc, leave) => {
      const startDate = new Date(leave?.startDate);
      const endDate = new Date(leave?.endDate);
      const leaveExist =
        (appliedStartDate >= startDate && endDate <= appliedStartDate) ||
        (appliedEndDate >= startDate && endDate <= appliedEndDate);
      return (acc = leaveExist);
    }, false);
  }

  onSubmit() {
    this.leaveDetails.markAllAsTouched();
    if (this.leaveDetails.invalid || !this.userId) return;

    if (this.checkLeaveExist()) {
      this.snackBar.show({ message: LEAVE_EXIST });
      return;
    }
    const form = this.leaveDetails;
    const noOfDays = getDurationBetweenTwoDates(
      form.get('startDate')?.value,
      form.get('endDate')?.value
    );

    const payload = {
      ...form.value,
      userId: this.userId,
      duration: formatPlural({ number: noOfDays + 1, word: 'Day' }),
    };

    this.api.service.post(this.api.path.LEAVE_DETAILS, payload).subscribe({
      next: (value) => {
        this.snackBar.show({ message: LEAVE_APPLIED });
        this.store.dispatch(loadLeaveDetails());
        this.router.navigate([routePath.LEAVE_LIST]);
      },
    });
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];

    this.store.select(getLeaves).subscribe((value: any[]) => {
      this.leaves = value?.filter((leave) => leave?.userId === this.userId);
    });
  }
}
