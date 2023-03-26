import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { jwtInterceptor, serverErrorInterceptor } from './app/lib/interceptors';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([jwtInterceptor, serverErrorInterceptor]))],
}).catch((error) => console.error(error));
