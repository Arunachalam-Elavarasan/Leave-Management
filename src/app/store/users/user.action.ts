import { createAction, props } from '@ngrx/store';

export const addUser = createAction('Add User', props<{ value: any }>());

export const updateUser = createAction(
  'Update User',
  props<{ id: string; value: any }>()
);

export const deleteUser = createAction('Delete User', props<{ id: string }>());
