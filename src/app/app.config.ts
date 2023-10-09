import { ApplicationConfig, ENVIRONMENT_INITIALIZER, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ConfigurationToken as GoogleConfigurationToken } from "./google/models";
import { configuration as googleConfiguration} from "./configs/google";
import { MatIconRegistry } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {

  providers:[
    {provide: GoogleConfigurationToken, useValue: googleConfiguration},
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(MatNativeDateModule),
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
      const iconRegistry = inject(MatIconRegistry);
      const outlinedFontSetClasses = iconRegistry
      .getDefaultFontSetClass()
      .filter((fontSetClass) => fontSetClass !== 'material-icons')
      .concat(['material-symbols-outlined']);
      iconRegistry.setDefaultFontSetClass(...outlinedFontSetClasses);
      },
      },
  ]

};



