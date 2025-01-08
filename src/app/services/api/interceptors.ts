import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';

import { setLoader } from '../../store/app/app.action';
import { SnackBarService } from '../snackBar/snack-bar.service';
import { getErrorMessage } from '../../utils/common';

export function errorHandlingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const store = inject(Store);
  const snackBar = inject(SnackBarService);

  store.dispatch(setLoader({ isLoading: true }));
  return next(req).pipe(
    catchError((error) => {
      snackBar.show({ message: getErrorMessage(error) });
      return throwError(() => error);
    }),
    finalize(() => {
      store.dispatch(setLoader({ isLoading: false }));
    })
  );
}
