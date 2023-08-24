import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {registerLicense} from '@syncfusion/ej2-base'

// registerLicense("Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhBYVF+WmFZfV1gdV9HY1ZUQGYuP1ZhSXxQdk1hWH9fcXdQQmVUWEA=")
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
