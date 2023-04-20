import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListOptionComponent } from './task-list-option.component';

describe('TaskListComponent', () => {
  let component: TaskListOptionComponent;
  let fixture: ComponentFixture<TaskListOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
