import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@lib/services';

export const authGuard: CanMatchFn = (_, segments): boolean => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLoggedIn = authService.isLoggedIn;
  if (isLoggedIn) {
    return true;
  }

  const callbackURL = segments.map((s) => s.path).join('/');
  router.navigate(['/auth/login'], { queryParams: { callbackURL } });
  return false;
};
