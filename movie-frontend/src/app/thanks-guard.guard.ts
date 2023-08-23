import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ConfirmToThanksService} from "./confirm-to-thanks.service";

export const thanksGuardGuard: CanActivateFn = (route, state) => {

  const C2TService = inject(ConfirmToThanksService);
  const router = inject(Router);
  if (C2TService.getBookingData()) {
    return true;
  } else {
    router.navigate(['/confirm']);
    return false;
  }
}
