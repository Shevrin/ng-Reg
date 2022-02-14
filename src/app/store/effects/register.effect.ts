import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { IcurrentUser } from 'src/app/models/current-user.interface';
import { AppService } from 'src/app/services/app.service';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/reg.action';

@Injectable({
  providedIn: 'root',
})
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.appService.register(request).pipe(
          map((currentUser: IcurrentUser) => {
            return registerSuccessAction({ currentUser });
          }),
          catchError(() => {
            return of(registerFailureAction());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private appService: AppService) {}
}
