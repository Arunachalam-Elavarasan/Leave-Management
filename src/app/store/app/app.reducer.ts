import { createReducer, on } from '@ngrx/store';
import { addUsers, deleteUser, updateUser, userAdded } from './app.action';
import { AppStore } from '../../model/store';
import { removeData } from '../../utils/common';

export const initialStore: AppStore = {
  users: [],
};

export const AppReducer = createReducer(
  initialStore,
  on(addUsers, (state, action) => ({ ...state, users: [...action?.value] })),
  on(userAdded, (state, action) => ({
    ...state,
    users: [...state.users, action.value],
  })),
  on(deleteUser, (state, action) => {
    const updateUserList = removeData(state?.users, action?.id);
    return { ...state, users: updateUserList };
  }),
  on(updateUser, (state) => state)
);
