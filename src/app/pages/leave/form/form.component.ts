import { Component, inject } from '@angular/core';
import { ScreenHeaderComponent } from '../../../components/shared/screen-header/screen-header.component';
import { TextFieldComponent } from '../../../components/shared/form-fields/text-field/text-field.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFieldComponent } from '../../../components/shared/form-fields/date-field/date-field.component';
import { ListHeaderAction } from '../../../model/common';
import {
  leaveFormActions,
  leaveInitialValues,
} from '../../../constants/userLeaves';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../../services/form/form-service.service';
import { leaveDetailsValidation } from '../../../constants/validations';
import { CANCEL } from '../../../constants/userDetails';
import { routePath } from '../../../constants/route';
import { ApiService } from '../../../services/api/api.service';
import { formatPlural, getDaysBetweenTwoDate } from '../../../utils/common';
import { Store } from '@ngrx/store';
import { loadLeaveDetails } from '../../../store/app/app.action';

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
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);
  private api = inject(ApiService);
  formService = inject(FormService);
  actions: ListHeaderAction[] = leaveFormActions;
  userDetails!: any[];
  userId: string = '';

  leaveDetails = this.formBuilder.group(leaveInitialValues);

  validation = leaveDetailsValidation;

  onActionClick(action: any) {
    action === CANCEL && this.router.navigate([routePath.LEAVE_LIST]);
  }

  onSubmit() {
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
        this.router.navigate([routePath.LEAVE_LIST]);
        this.store.dispatch(loadLeaveDetails());
      },
      error: (err) => {},
    });
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
  }
}
