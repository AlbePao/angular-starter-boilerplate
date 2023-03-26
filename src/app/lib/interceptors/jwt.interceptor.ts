import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environment';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const isLoggedIn = true;
  const token = 'ABC';
  const isApiUrl = request.url.startsWith(environment.apiUrl);

  if (isLoggedIn && isApiUrl) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(request);
};
