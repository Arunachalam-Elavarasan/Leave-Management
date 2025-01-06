import { HeaderActions } from '../model/common';
import { UserListItem } from '../model/userDetails';
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
