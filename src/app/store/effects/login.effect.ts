import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { IcurrentUser } from 'src/app/models/current-user.interface';
import { AppService } from 'src/app/services/app.service';
import { StorageService } from 'src/app/services/storage.service';
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/login.action';

@Injectable({
  providedIn: 'root',
})
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.appService.login(request).pipe(
          map((currentUser: IcurrentUser) => {
            this.storageService.set('successToken', currentUser.token);
            return loginSuccessAction({ currentUser });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(
              loginFailureAction({ errors: errorResponce.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
           this.router.navigateByUrl('/account');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private appService: AppService,
    private storageService: StorageService,
    private router: Router
  ) {}
}
