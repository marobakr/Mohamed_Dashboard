import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule } from 'angular-notifier';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeadrComponent } from './components/headr/headr.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { UsersModule } from './users/users.module';
@NgModule({
  declarations: [AppComponent, FooterComponent, HeadrComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UsersModule,
    AuthModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    NotifierModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
