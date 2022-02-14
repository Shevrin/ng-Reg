import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IappState } from 'src/app/store/models/app-state.interface';
import { IauthState } from '../models/auth-state.interface';

export const authFeatureSelector = createFeatureSelector<IauthState>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: IauthState) => authState.isSubmitting
);
