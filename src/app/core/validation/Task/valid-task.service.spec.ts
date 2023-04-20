import { TestBed } from '@angular/core/testing';

import { ValidationTaskService } from './valid-task.service';

describe('TaskService', () => {
  let service: ValidationTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
