import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig =  {
  providers: [provideRouter(routes,withHashLocation(),withViewTransitions(), withInMemoryScrolling({scrollPositionRestoration:'top'})
  ),
  provideHttpClient(withInterceptors([loadingInterceptor])),importProvidersFrom(BrowserAnimationsModule, ToastrModule.forRoot(),), provideClientHydration(), NgxSpinnerModule],
  
};

