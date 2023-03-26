import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const serverErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        if ([401, 403].includes(error.status)) {
          router.navigateByUrl('/auth/login');
          return throwError(() => error);
        } else {
          console.error(error);
          return throwError(() => error);
        }
      }

      return EMPTY;
    }),
  );
};
