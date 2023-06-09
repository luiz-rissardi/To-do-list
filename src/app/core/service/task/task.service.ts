import { Injectable } from '@angular/core';

import { StateLists } from '../../state/Lists';
import { TaskListModel } from '../../model/TaskList';
import { TaskModel } from '../../model/Task';
import { TaskListService } from 'src/app/core/service/taskList/task-list.service';
import { ValidationTaskService } from '../../validation/Task/valid-task.service';
import { NotificationService } from '../notification/notification.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private ListsState: StateLists,
    private TaskValidation:ValidationTaskService,
    private NotificationService:NotificationService,
    private TaskListService:TaskListService
  ) { }

  StartTimerToRemoveTask() {
    const  TaskLists = this.ListsState.GetState();
    TaskLists.forEach((tasklist: TaskListModel) => {
      tasklist.tasks.forEach((task: TaskModel) => {
        this.StartTimerTask(task)
      })
    })
  }

  toogleComplete(task:TaskModel){
    const TaskLists = this.ListsState.GetState();
    TaskLists.forEach((tasklist: TaskListModel) => {
      tasklist.tasks.forEach((el: TaskModel) => {
        if(el.id === task.id){
          el.complete = !el.complete;
        }
      })
    })
  }

  private StartTimerTask(task:TaskModel){
    if(this.TaskValidation.taskTimeHasAlreadyExpired(task)){
      this.TaskListService.DeleteTask(task);
    }else{
      setTimeout(() => {
        this.NotificationService.NotifyTaskExpired(task);
        this.TaskListService.DeleteTask(task);
      }, new Date(task.duracao).getTime() - Date.now());
    }
  }
}
