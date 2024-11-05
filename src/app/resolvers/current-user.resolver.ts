import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { CurrentUserDto } from "../models";
import { UserService } from "../services/user/user.service";
import { LoadingService } from "../services/loading/loading.service";
import { finalize } from "rxjs";

export const currentUserResolver: ResolveFn<CurrentUserDto> = (route: ActivatedRouteSnapshot, _: RouterStateSnapshot) => {
  const userService = inject(UserService);
  const loadingService = inject(LoadingService);

  loadingService.isLoading = true;

  return userService.getCurrent().pipe(finalize(() => loadingService.isLoading = false));
}
