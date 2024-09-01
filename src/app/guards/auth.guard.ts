import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LOGIN_URL } from '../app.config';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { ChatService } from '../services/chat/chat.service';

export const authGuard: CanActivateFn = async (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const chatService = inject(ChatService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (!userService.current) {
      userService.getCurrent().subscribe();
    }
    chatService.connect();
    return true;
  }

  await router.navigate([LOGIN_URL]);
  return false;
}
