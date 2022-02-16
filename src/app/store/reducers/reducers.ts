import { createReducer, on } from '@ngrx/store';
import {
  getCurrentUserAction,
  getCurrentUserSuccessAction,
  getCurrentUserFailureAction,
} from '../actions/getCurrentUser.action';
import {
  loginAction,
  loginSuccessAction,
  loginFailureAction,
} from '../actions/login.action';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/reg.action';
import { IauthState } from '../models/auth-state.interface';

const initialState: IauthState = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggingIn: true,
  validationErrors: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): IauthState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): IauthState => ({
      ...state,
      isSubmitting: false,
      isLoggingIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    registerFailureAction,
    (state, action): IauthState => ({
      ...state,
      isSubmitting: false,
      isLoggingIn: false,
      validationErrors: action.errors,
    })
  ),
  on(
    loginAction,
    (state): IauthState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): IauthState => ({
      ...state,
      isSubmitting: false,
      isLoggingIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    loginFailureAction,
    (state, action): IauthState => ({
      ...state,
      isSubmitting: false,
      isLoggingIn: false,
      validationErrors: action.errors,
    })
  ),
  on(
    getCurrentUserAction,
    (state): IauthState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): IauthState => ({
      ...state,
      isLoading: false,
      isLoggingIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): IauthState => ({
      ...state,
      isLoading: false,
      isLoggingIn: true,
      currentUser: null,
    })
  )
);
