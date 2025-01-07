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
