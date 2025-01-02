import { createFeatureSelector, createSelector } from '@ngrx/store';

const usersStore = createFeatureSelector<any>('users');

export const getUsers = createSelector(usersStore, (state) => state);

export const getUser = createSelector(usersStore, (state) => state);
