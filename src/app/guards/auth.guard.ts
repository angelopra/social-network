import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LOGIN_URL } from '../app.config';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = async (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  await router.navigate([LOGIN_URL]);
  return false;
}
