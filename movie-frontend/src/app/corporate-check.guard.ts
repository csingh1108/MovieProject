import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginToMainService} from "./login-to-main.service";

export const corporateCheckGuard: CanActivateFn = (route, state) => {
  const checkLoginRole= inject(LoginToMainService)
  const router= inject(Router)
  if(checkLoginRole.getUserRole() === "ADMIN"){
    return true;
  }
  router.navigateByUrl("/corporate/login")
  return false;
};
