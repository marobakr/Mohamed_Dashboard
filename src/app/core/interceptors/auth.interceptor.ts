import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let headers = req.headers
      .set('Accept', 'application/json')
      .set('Accept-Language', 'ar')
      .set('App-Version', '11')
      .set('Device-Name', 'chrome')
      .set('Device-OS-Version', '13')
      .set('Device-UDID', '1234')
      .set('Device-Push-Token', '123456')
      .set('Device-Type', 'web');

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const clonedRequest = req.clone({ headers });

    return next.handle(clonedRequest);
  }
}
