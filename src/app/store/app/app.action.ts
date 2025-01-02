import { createAction, props } from '@ngrx/store';
import { Users } from '../../model/users';

export const addUsers = createAction('Add Users', props<{ value: Users[] }>());

export const addUser = createAction('Add User', props<{ value: any }>());

export const updateUser = createAction(
  'Update User',
  props<{ id: string; value: any }>()
);

export const deleteUser = createAction('Delete User', props<{ id: string }>());
