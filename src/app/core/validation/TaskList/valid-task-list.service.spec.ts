import { TestBed } from '@angular/core/testing';

import { ValidationTaskListService } from './valid-task-list.service';

describe('ValidationTaskListService', () => {
  let service: ValidationTaskListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationTaskListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
