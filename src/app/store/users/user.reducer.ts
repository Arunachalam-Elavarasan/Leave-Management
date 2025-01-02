import { createReducer, on } from '@ngrx/store';
import { addUser, deleteUser, updateUser } from './user.action';

export const initialStore = {
  users: [],
};

export const UserReducer = createReducer(
  initialStore,
  on(addUser, (state) => state),
  on(deleteUser, (state) => state),
  on(updateUser, (state) => state)
);
