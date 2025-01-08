import { createReducer, on } from '@ngrx/store';
import { addLeaveDetails, addUsers, setLoader, userAdded } from './app.action';
import { AppStore } from '../../model/store';

export const initialStore: AppStore = {
  users: [],
  leaveDetails: [],
  isLoading: false,
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
  })),
  on(setLoader, (state, action) => ({
    ...state,
    isLoading: action?.isLoading,
  }))
);
