import { createReducer, on } from '@ngrx/store';
import { registerAction } from '../actions/reg.action';
import { IauthState } from '../models/auth-state.interface';

const initialState: IauthState = {
  isSubmitting: false,
};

export const authReducer = createReducer(
  initialState,
  on(registerAction, (state: IauthState) => ({
    ...state,
    isSubmiting: true,
  }))
);
