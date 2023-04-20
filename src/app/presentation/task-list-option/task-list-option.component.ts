import { Component, Input } from '@angular/core';

import { TaskListModel } from 'src/app/core/model/TaskList';
import { StateTaskList } from 'src/app/core/state/TaskList';

@Component({
  selector: 'app-task-list-option',
  templateUrl: './task-list-option.component.html',
  styleUrls: ['./task-list-option.component.scss']
})
export class TaskListOptionComponent {

  @Input() TaskList!: TaskListModel
  constructor(
    private StatetaskList: StateTaskList
  ) {
  }

  SelectTaskList(TaskList: TaskListModel) {
    this.StatetaskList.SetState(TaskList);
  }
}
