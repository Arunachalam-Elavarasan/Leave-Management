import { createReducer, on } from '@ngrx/store';
import { addLeaveDetails, addUsers, userAdded } from './app.action';
import { AppStore } from '../../model/store';

export const initialStore: AppStore = {
  users: [],
  leaveDetails: [],
};

export const AppReducer = createReducer(
  initialStore,
  on(addUsers, (state, action) => ({ ...state, users: [...action?.value] })),
  on(userAdded, (state, action) => ({
    ...state,
    users: [...state.users, action.value],
  })),
  on(addLeaveDetails, (state, action) => ({
    ...state,
    leaveDetails: action?.value,
  }))
);
