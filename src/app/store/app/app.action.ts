import { createAction, props } from '@ngrx/store';

export const appActions = {
  ADD_USERS: 'Add Users',
  ADD_USER: 'Add User',
  UPDATE_USER: 'Update User',
  DELETE_USER: 'Delete User',
  USER_ADDED_SUCCESSFULLY: '[User Added] Successfully',
  LOAD_USER: `[Load Users]`,

  LOAD_LEAVE_DETAILS: `[Load Leave] Details`,
  ADD_LEAVE_DETAILS: '[Add Leave] Details',
};

export const loadUsers = createAction(appActions.LOAD_USER);

export const addUsers = createAction(
  appActions?.ADD_USERS,
  props<{ value: any[] }>()
);

export const addUser = createAction(
  appActions?.ADD_USER,
  props<{ value: any }>()
);

export const userAdded = createAction(
  appActions?.USER_ADDED_SUCCESSFULLY,
  props<{ value: any }>()
);

export const updateUser = createAction(
  appActions?.UPDATE_USER,
  props<{ id: string; value: any }>()
);

export const deleteUser = createAction(
  appActions?.DELETE_USER,
  props<{ id: string }>()
);

export const loadLeaveDetails = createAction(appActions?.LOAD_LEAVE_DETAILS);

export const addLeaveDetails = createAction(
  appActions?.ADD_LEAVE_DETAILS,
  props<{ value: any }>()
);
