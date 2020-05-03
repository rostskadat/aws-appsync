import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Category } from 'typescript-logging';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** @internal */
const LOGGER = new Category('JsonRequestInterceptor');

/**
 * The {@link JsonRequestInterceptor} makes sure that the correct header are
 * present in any request to the backend
 */
@Injectable()
export class JsonRequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.headers.has('Content-Type')) {
      LOGGER.debug('Adding Content-Type Header to request')
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    LOGGER.debug('Adding Accept Header to request')
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    return next.handle(request);
  }
}
