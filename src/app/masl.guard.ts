import { CanActivateFn } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { inject } from '@angular/core';

export const maslGuard: CanActivateFn = (route, state) => {
  const msalService = inject(MsalService);  // Correctly inject the MsalService
  const activeAccount = msalService.instance.getActiveAccount();

  if (!activeAccount) {
    msalService.loginRedirect();
    return false;
  }

  return true;
};
