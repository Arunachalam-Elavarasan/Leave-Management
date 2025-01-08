import { createFeatureSelector, createSelector } from '@ngrx/store';

const appStore = createFeatureSelector<any>('app');

export const getUsers = createSelector(appStore, (state) => state?.users);

export const getLeaves = createSelector(
  appStore,
  (state) => state?.leaveDetails
);

export const getLoader = createSelector(appStore, (state) => state?.isLoading);
