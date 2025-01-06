import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of } from 'rxjs';
import {
  addLeaveDetails,
  addUser,
  addUsers,
  appActions,
  userAdded,
} from './app.action';
import { ApiService } from '../../services/api/api.service';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private api = inject(ApiService);

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.ADD_USER),
      exhaustMap((action) => {
        return this.api.service.post(this.api.path.USERS, action?.value).pipe(
          map((data) => {
            return userAdded({ value: data });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.LOAD_USER),
      exhaustMap(() => {
        return this.api.service.get(this.api.path.USERS).pipe(
          map((value: any) => {
            return addUsers({ value });
          })
        );
      }),
      catchError(() => EMPTY)
    )
  );

  loadLeaveDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.LOAD_LEAVE_DETAILS),
      exhaustMap(() => {
        return this.api.service.get(this.api.path.LEAVE_DETAILS).pipe(
          map((value: any) => {
            return addLeaveDetails({ value });
          })
        );
      })
    )
  );
}
