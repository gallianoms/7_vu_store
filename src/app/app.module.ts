import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/common/pages/home/home.component';
import { AboutComponent } from './features/common/pages/about/about.component';
import { ErrorComponent } from './features/common/pages/error/error.component';
import { NotFoundComponent } from './features/common/pages/not-found/not-found.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ErrorComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [
    provideHttpClient(
      withInterceptors([jwtInterceptor, loadingInterceptor, errorInterceptor]),
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
