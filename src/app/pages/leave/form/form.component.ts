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
import { leaveDetailsValidation } from '../../../constants/validations';
import { FormService } from '../../../services/form/form-service.service';
import { formatPlural, getDaysBetweenTwoDate } from '../../../utils/common';
import {
  LEAVE_APPLIED,
  leaveFormActions,
  leaveInitialValues,
} from '../../../constants/userLeaves';
import { SnackBarService } from '../../../services/snackBar/snack-bar.service';
import { checkEndDateValidation } from '../../../validators/leaveDetails';

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

  userDetails!: any[];
  userId: string = '';
  actions: ListHeaderAction[] = leaveFormActions;
  validation = leaveDetailsValidation;
  leaveDetails: FormGroup = this.formBuilder.group(leaveInitialValues, {
    validators: checkEndDateValidation(),
  });

  onActionClick(action: any) {
    action === CANCEL && this.router.navigate([routePath.LEAVE_LIST]);
  }

  onSubmit() {
    console.log(this.leaveDetails);
    if (this.leaveDetails.invalid || !this.userId) return;
    const form = this.leaveDetails;
    const noOfDays = getDaysBetweenTwoDate(
      form.get('startDate')?.value,
      form.get('endDate')?.value
    );

    const payload = {
      ...form.value,
      userId: this.userId,
      duration: formatPlural({ number: noOfDays, word: 'Day' }),
    };

    this.api.service.post(this.api.path.LEAVE_DETAILS, payload).subscribe({
      next: (value) => {
        this.snackBar.show({ message: LEAVE_APPLIED });
        this.router.navigate([routePath.LEAVE_LIST]);
        this.store.dispatch(loadLeaveDetails());
      },
    });
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
  }
}
