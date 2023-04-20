import { Component, Input } from '@angular/core';
import { TaskListFacade } from 'src/app/abstraction/facades/TaskList';
import { TaskFacade } from 'src/app/abstraction/facades/task';
import { TaskModel } from 'src/app/core/model/Task';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() public Task!: TaskModel;
  constructor(
    private taskListFacade: TaskListFacade,
    private taskFacade:TaskFacade
  ) {
    this.taskFacade.StartTimeoutTask();
  }

  RemoveTask(task: TaskModel) {
    this.taskListFacade.DeleteTask(task)
  }
}
