import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { MockInterceptor } from './shared/services/interceptor.service';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { providePrimeNG } from 'primeng/config';
import LaraTheme from '@primeng/themes/lara';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const APP_CONFIG: ApplicationConfig = {
    providers: [
        BrowserModule,
        BrowserAnimationsModule,
        provideFirebaseApp(() => initializeApp({ 
            ...environment.firebaseConfig
        })),
        provideFirestore(() => getFirestore()),
        provideRouter(
            APP_ROUTES,
        ),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MockInterceptor,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: LaraTheme
            }
        })
    ],
};
