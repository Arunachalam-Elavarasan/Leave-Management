import { createReducer, on } from '@ngrx/store';
import { addUsers, deleteUser, updateUser, userAdded } from './app.action';
import { AppStore } from '../../model/store';

export const initialStore: AppStore = {
  users: [],
};

export const AppReducer = createReducer(
  initialStore,
  on(addUsers, (state, action) => ({
    users: [...state.users, ...action?.value],
  })),
  on(userAdded, (state, action) => ({
    users: [...state.users, action.value],
  })),
  on(deleteUser, (state) => state),
  on(updateUser, (state) => state)
);
