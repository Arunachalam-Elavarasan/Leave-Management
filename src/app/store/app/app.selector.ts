import { createFeatureSelector, createSelector } from '@ngrx/store';

const appStore = createFeatureSelector<any>('app');

export const getUsers = createSelector(appStore, (state) => state?.users);
