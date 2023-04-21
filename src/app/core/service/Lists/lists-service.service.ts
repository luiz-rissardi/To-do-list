import { Injectable } from '@angular/core';

import { TaskListModel } from 'src/app/core/model/TaskList';
import { StateLists } from '../../state/Lists';
import { ValidationTaskListService } from '../../validation/TaskList/valid-task-list.service';


@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listsBeforeFilter: TaskListModel[] = [];

  constructor(
    private ListsState: StateLists,
    private TaskListValidations: ValidationTaskListService
  ) { }

  CreateTaskList(titulo: string, descricao: string): void {
    const list = new TaskListModel(titulo, descricao, this.GenerateId());
    if (this.TaskListValidations.isValidTaskList(list)) {
      this.ListsState.AddList(list);
    } else {
      throw new Error("Campos não preenchidos");
    }
  }

  DeleteTaskList(list: TaskListModel): void {
    try {
      this.ListsState.ListenStateAllLists()
        .subscribe(this.filterLists(list))
        .unsubscribe();
      this.ListsState.SetState(this.listsBeforeFilter);
    } catch (error) {
      throw new Error("Error ao Excluir lista de tarefas")
    }
  }

  private filterLists(taskListParam: TaskListModel) {
    return (lists: TaskListModel[]) => {
      this.listsBeforeFilter = lists.filter((el: any) => {
        if (el.id === taskListParam.id) {
          return false
        }
        return true
      });
    }
  }

  private GenerateId(): string {
    return String(Math.floor(Math.random() * 99999999 + 1));
  }
}
