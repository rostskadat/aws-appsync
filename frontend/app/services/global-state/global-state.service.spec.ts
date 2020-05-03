import { GlobalStateService } from './global-state.service';
import { TestBed } from '@angular/core/testing';

describe('GlobalStateService', () => {
  let service: GlobalStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
