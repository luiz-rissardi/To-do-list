import { TestBed } from '@angular/core/testing';
import { ListService } from './lists-service.service';

describe('TaskListServiceService', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
