import { AppModule } from 'frontend/app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from 'frontend/environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
