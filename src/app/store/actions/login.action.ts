import { createAction, props } from '@ngrx/store';
import { IauthRequest } from 'src/app/models/auth-request.interface';
import { IcurrentUser } from 'src/app/models/current-user.interface';
import { ActionTypes } from './actionTypes';
import { IbackendErrors } from 'src/app/models/backend-errors.interface';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: IauthRequest }>()
);
export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ currentUser: IcurrentUser }>()
);
export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: IbackendErrors }>()
);
