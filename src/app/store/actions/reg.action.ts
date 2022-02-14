import { createAction, props } from '@ngrx/store';
import { IregUser } from 'src/app/models/reg-user.interface';
import { ActionTypes } from './actionTypes';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<IregUser>()
);
