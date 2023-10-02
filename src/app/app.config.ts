import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ConfigurationToken as GoogleConfigurationToken } from "./google/models";
import { configuration as googleConfiguration} from "./configs/google";
export const appConfig: ApplicationConfig = {
  providers:[
    {provide: GoogleConfigurationToken, useValue: googleConfiguration},
    provideHttpClient(),
    provideRouter(routes),
  ]

};


