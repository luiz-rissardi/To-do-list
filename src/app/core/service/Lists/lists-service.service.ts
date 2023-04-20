import { Injectable } from '@angular/core';

import { TaskListModel } from 'src/app/core/model/TaskList';
import { StateLists } from '../../state/Lists';
import { ValidationTaskListService } from '../../validation/TaskList/valid-task-list.service';
import { StateTaskList } from '../../state/TaskList';



@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private ListsState: StateLists,
    private TaskListState:StateTaskList,
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

  RemoveTaskList(list: TaskListModel):void {
    try {
      let data: TaskListModel[] = [];
      this.ListsState.ListenStateAllLists()
        .subscribe(lists => {
          data = lists.filter((el: any) => {
            if (el.id === list.id) {
              return false
            }
            return true
          })
        }).unsubscribe();
      this.ListsState.SetState(data);
      this.TaskListState.SetState(new TaskListModel("","",""));
    } catch (error) {
      throw new Error("Error ao Excluir lista de tarefas")
    }
  }

  private GenerateId():string{
    return String(Math.floor(Math.random() * 99999999 + 1));
  }
}
