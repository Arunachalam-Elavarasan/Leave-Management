import { createAction, props } from '@ngrx/store';

export const appActions = {
  ADD_USERS: 'Add Users',
  ADD_USER: 'Add User',
  UPDATE_USER: 'Update User',
  DELETE_user: 'Delete User',
  USER_ADDED_SUCCESSFULLY: '[User Added] Successfully',
  LOAD_USER: `[Load Users]`,
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
  appActions?.DELETE_user,
  props<{ id: string }>()
);
