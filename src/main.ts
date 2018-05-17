import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  const server = '(http://localhost:8080/dbapi/webresources/citype)';
}

platformBrowserDynamic().bootstrapModule(AppModule);
