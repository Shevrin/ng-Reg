import { createAction, props } from '@ngrx/store';
import { IregRequest } from 'src/app/models/reg-request.interface';
import { IcurrentUser } from 'src/app/models/current-user.interface';
import { ActionTypes } from './actionTypes';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: IregRequest }>()
);
export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ currentUser: IcurrentUser }>()
);
export const registerFailureAction = createAction(ActionTypes.REGISTER_FAILURE);
