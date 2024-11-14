import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { finalize } from "rxjs";
import { CurrentUserDto } from "../models";
import { LoadingService } from "../services/loading/loading.service";
import { UserService } from "../services/user/user.service";

export const currentUserResolver: ResolveFn<CurrentUserDto> = (route: ActivatedRouteSnapshot, _: RouterStateSnapshot) => {
  const userService = inject(UserService);
  const loadingService = inject(LoadingService);

  loadingService.isLoading = true;

  return userService.getCurrent().pipe(finalize(() => loadingService.isLoading = false));
}
