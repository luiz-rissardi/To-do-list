import { Injectable, OnInit } from '@angular/core';
import { StateLists } from '../../state/Lists';
import { TaskListModel } from '../../model/TaskList';
import { TaskModel } from '../../model/Task';
import { StateTaskList } from '../../state/TaskList';
import { SaveListsInStorage } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private TaskLists: TaskListModel[] = [];
  constructor(
    private ListsState: StateLists,
    private SaveStorage:SaveListsInStorage
  ) { }

  TimerToRemoveTask() {
    this.TaskLists = this.ListsState.GetState();
    this.TaskLists.forEach((tasklist: TaskListModel) => {
      tasklist.tasks.forEach((task: TaskModel) => {
        setTimeout(() => {
          this.RemoveTask(task)
        }, task.duracaoInMiliseconds);
      })
    })
  }

  private RemoveTask(task: TaskModel) {
    const lists = this.ListsState.GetState()
      .map((TaskList: TaskListModel) => {
        TaskList.tasks = TaskList.tasks.filter(el => {
          return el.id !== task.id
        })
        return TaskList
      })
      this.ListsState.SetState(lists);
      this.SaveStorage.saveListsInStorage(lists)
  }
}
