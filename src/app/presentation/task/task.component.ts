import { Component, Input, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { TaskListFacade } from 'src/app/abstraction/facades/TaskList';
import { TaskFacade } from 'src/app/abstraction/facades/task';
import { TaskModel } from 'src/app/core/model/Task';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent  implements OnInit{
  @Input() public Task!: TaskModel;
  constructor(
    private taskListFacade: TaskListFacade,
    private taskFacade: TaskFacade,
  ) {
  }
  ngOnInit(): void {
    this.taskFacade.StartTimeoutTask();
  }

  RemoveTask(task: TaskModel) {
    this.taskListFacade.DeleteTask(task)
  }

  toggleComplete(TaskItem: HTMLDivElement) {
    this.taskFacade.toggleCompleteTask(this.Task);
    this.setColorTask(TaskItem)
  }

  private setColorTask(TaskItem: HTMLDivElement) {
    if (!this.Task.complete) {
      TaskItem.classList.add("notComplete");
      TaskItem.classList.remove("complete");
    } else {
      TaskItem.classList.add("complete");
      TaskItem.classList.remove("notComplete");
    }
  }

}
