import { TestBed } from '@angular/core/testing';

import { JsonRequestInterceptor } from './json-request.interceptor';

describe('JsonRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JsonRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JsonRequestInterceptor = TestBed.inject(JsonRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
