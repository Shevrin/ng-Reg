import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { IcurrentUser } from 'src/app/models/current-user.interface';
import { AppService } from 'src/app/services/app.service';
import { StorageService } from 'src/app/services/storage.service';
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
            this.storageService.set('successToken', currentUser.token);
            return registerSuccessAction({ currentUser });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(
              registerFailureAction({ errors: errorResponce.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
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
