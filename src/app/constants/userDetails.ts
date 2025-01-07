import { Validators } from '@angular/forms';
import { HeaderActions } from '../model/common';
import { FormHeaderAction, UserListItem } from '../model/userDetails';
import { DialogConfig, DialogData } from '../services/dialog/dialog.service';

export const userDetailsList: UserListItem[] = [
  {
    label: 'First Name',
    accessor: 'firstName',
  },
  {
    label: 'Last Name',
    accessor: 'lastName',
  },
  {
    label: 'Email',
    accessor: 'email',
  },
  {
    label: 'Phone No',
    accessor: 'phoneNo',
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
        iconName: 'visibility',
        iconColor: 'accent',
        name: 'view',
      },
      {
        iconName: 'delete',
        iconColor: 'warn',
        name: 'delete',
      },
    ],
  },
];

export function userStatusItem(template: any): UserListItem {
  return {
    label: 'Status',
    accessor: 'status',
    template,
  };
}

export const userHeaderAction: HeaderActions = [
  { label: 'Add Details', action: 'add', color: 'primary' },
];

export const userDialogConfig: DialogConfig = {
  width: '60%',
  enterAnimationDuration: '200ms',
  exitAnimationDuration: '400ms',
};

export const userDialogData: DialogData = {
  title: 'Delete User',
  message: 'Are you sure, Do you want to delete this user?',
  submitBtn: {
    label: 'Delete',
    color: 'warn',
  },
  cancelBtn: {
    label: 'Cancel',
    color: 'primary',
  },
};

export const basicInfo = {
  firstName: ['', [Validators.required]],
  lastName: ['', [Validators.required]],
  email: ['', [Validators.required, Validators.email]],
  phoneNo: ['', [Validators.required, Validators.minLength(10)]],
  status: true,
  secondarySameAsPrimary: false,
};

export const contactInfo = {
  address: ['', [Validators.required]],
  street: ['', [Validators.required]],
  city: ['', [Validators.required]],
  state: ['', [Validators.required]],
  pinCode: ['', [Validators.required, Validators.minLength(6)]],
};

export const formHeaderActions: FormHeaderAction[] = [
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
