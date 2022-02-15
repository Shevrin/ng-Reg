import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { IcurrentUser } from 'src/app/models/current-user.interface';
import { AppService } from 'src/app/services/app.service';
import { StorageService } from 'src/app/services/storage.service';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/getCurrentUser.action';

@Injectable({
  providedIn: 'root',
})
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.storageService.get('successToken');
        if (!token) {
          return of(getCurrentUserFailureAction());
        }
        return this.appService.getCurrentUser().pipe(
          map((currentUser: IcurrentUser) => {
            return getCurrentUserSuccessAction({ currentUser });
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private appService: AppService,
    private storageService: StorageService
  ) {}
}
