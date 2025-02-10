import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MSAL_INSTANCE, MsalService, MsalGuard } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

import { routes } from './app.routes';
import {environment} from '../environments/environment';

export function MsalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msal.clientId,
      authority: environment.msal.authority,
      redirectUri: environment.msal.redirectUri,
    },
  });
}

export function InitializeMsalInstance(msalInstance: IPublicClientApplication): () => Promise<void> {
  return async () => {
    await msalInstance.initialize();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
    provideRouter(routes),
    {
      provide: MSAL_INSTANCE,
      useFactory: MsalInstanceFactory,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: InitializeMsalInstance,
      deps: [MSAL_INSTANCE],
      multi: true,
    },
    MsalService,
    MsalGuard,
  ],
};
