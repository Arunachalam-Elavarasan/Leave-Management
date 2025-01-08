import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';

import { routes } from './app.routes';
import { AppReducer } from './store/app/app.reducer';
import { AppEffects } from './store/app/app.effects';
import { errorHandlingInterceptor } from './services/api/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideStore({ app: AppReducer }),
    provideEffects([AppEffects]),
    provideHttpClient(withInterceptors([errorHandlingInterceptor])),
  ],
};
