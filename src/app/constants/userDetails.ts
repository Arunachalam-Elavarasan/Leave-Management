import { Form, Validators } from '@angular/forms';
import { HeaderActions, TableAction } from '../model/common';
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
  deactivationReason: [''],
  dateOfBirth: ['', [Validators.required]],
};

export const contactInfo = {
  address: ['', [Validators.required]],
  street: ['', [Validators.required]],
  city: ['', [Validators.required]],
  state: ['', [Validators.required]],
  pinCode: ['', [Validators.required, Validators.minLength(6)]],
};

export const qualificationInitialValue = {
  qualification: ['', [Validators.required]],
  percentage: ['', [Validators.required]],
};

export const APPLY_LEAVE = 'applyLeave';
export const SAVE = 'save';
export const CANCEL = 'cancel';
export const EDIT = 'edit';
export const VIEW = 'view';

export function getScreenTitle(isView: boolean, isEdit: boolean): string {
  return `${isView ? 'View' : isEdit ? 'Edit' : 'Add'} User Details`;
}

export const applyLeave: FormHeaderAction[] = [
  {
    label: 'Apply Leave',
    action: 'applyLeave',
    color: 'accent',
  },
];

export function saveInfo(isNew: boolean, isView: boolean): FormHeaderAction[] {
  return isNew || !isView
    ? [
        {
          label: isNew ? 'Save' : 'Update',
          action: 'save',
          color: 'primary',
          type: 'submit',
        },
      ]
    : [];
}

export const cancel: FormHeaderAction = {
  label: 'Cancel',
  action: 'cancel',
  color: 'warn',
};

export const userDetailsMessage = {
  DELETED_SUCCESSFULLY: 'User Deleted Successfully',
  STATUS_CHANGED: (isActive: boolean) =>
    `User Status Changed to ${isActive ? 'Active' : 'Inactive'}`,
  USER_CREATED: 'User Created Successfully',
  USER_UPDATED: 'User Updated Successfully',
};

export const qualificationTableSchema = (isDisabled: boolean) => [
  {
    label: 'Qualification',
    accessor: 'qualification',
  },
  {
    label: 'Percentage',
    accessor: 'percentage',
  },
  {
    label: 'Actions',
    accessor: 'actions',
    actions: [
      {
        iconName: 'edit',
        iconColor: 'primary',
        name: 'edit',
        isDisabled,
      },
      {
        iconName: 'delete',
        iconColor: 'warn',
        name: 'delete',
        isDisabled,
      },
    ],
  },
];
