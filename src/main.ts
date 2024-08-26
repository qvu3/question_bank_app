import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Add this import
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// Bootstrap the standalone root component with routing and HTTP Client
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()  
  ]
}).catch(err => console.error(err));
