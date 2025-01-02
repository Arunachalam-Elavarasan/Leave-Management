import { createReducer, on } from '@ngrx/store';
import { addUser, addUsers, deleteUser, updateUser } from './app.action';
import { AppStore } from '../../model/store';

export const initialStore: AppStore = {
  users: [],
};

export const AppReducer = createReducer(
  initialStore,
  on(addUsers, (state, action) => ({
    users: [...state.users, ...action?.value],
  })),
  on(addUser, (state) => state),
  on(deleteUser, (state) => state),
  on(updateUser, (state) => state)
);
