import { createAction, props } from '@ngrx/store';
import { IcurrentUser } from 'src/app/models/current-user.interface';
import { ActionTypes } from './actionTypes';

export const getCurrentUserAction = createAction(ActionTypes.GET_CURRENT_USER);
export const getCurrentUserSuccessAction = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: IcurrentUser }>()
);
export const getCurrentUserFailureAction = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE
);
