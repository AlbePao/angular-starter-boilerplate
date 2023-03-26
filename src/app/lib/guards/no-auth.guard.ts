import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@lib/services';

export const noAuthGuard: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLoggedIn = authService.isLoggedIn;
  if (isLoggedIn) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
