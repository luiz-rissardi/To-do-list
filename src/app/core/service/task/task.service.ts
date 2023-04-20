import { Injectable } from '@angular/core';

import { StateLists } from '../../state/Lists';
import { TaskListModel } from '../../model/TaskList';
import { TaskModel } from '../../model/Task';
import { TaskListService } from '../TaskList/task-list.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private ListsState: StateLists,
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

  private taskTimeHasAlreadyExpired(task:TaskModel){
    return new Date(task.duracao).getTime() < Date.now()
  }

  private StartTimerTask(task:TaskModel){
    if(this.taskTimeHasAlreadyExpired(task)){
      this.TaskListService.DeleteTask(task)
    }else{
      setTimeout(() => {
        this.TaskListService.DeleteTask(task)
      }, new Date(task.duracao).getTime() - Date.now());
    }
  }
}
