import { TestBed } from '@angular/core/testing';

import { WarningHandlerService } from './handler-warning.service';

describe('HandlerWarningService', () => {
  let service: WarningHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarningHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
