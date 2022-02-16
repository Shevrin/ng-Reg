import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IauthState } from '../models/auth-state.interface';

export const authFeatureSelector = createFeatureSelector<IauthState>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: IauthState) => authState.isSubmitting
);

export const validationSelector = createSelector(
  authFeatureSelector,
  (authState: IauthState) => authState.validationErrors
);

export const isLoggingInSelector = createSelector(
  authFeatureSelector,
  (authState: IauthState) => authState.isLoggingIn
);
