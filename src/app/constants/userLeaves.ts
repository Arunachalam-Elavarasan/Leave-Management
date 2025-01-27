import { Validators } from '@angular/forms';
import { ListHeaderAction } from '../model/common';

export const leaveFormActions: ListHeaderAction[] = [
  {
    label: 'Save',
    action: 'save',
    color: 'primary',
    type: 'submit',
  },
  {
    label: 'Cancel',
    action: 'cancel',
    color: 'accent',
  },
];

export const leaveInitialValues = {
  typeOfLeave: ['', Validators.required],
  comment: ['', Validators.required],
  startDate: ['', Validators.required],
  endDate: ['', Validators.required],
};

export const LEAVE_APPLIED: string = 'Leave Applied Successfully';
export const LEAVE_EXIST: string = 'Leave already exists for this dates';
