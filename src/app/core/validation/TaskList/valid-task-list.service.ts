import { Injectable } from '@angular/core';
import { TaskListModel } from '../../model/TaskList';

@Injectable({
  providedIn: 'platform'
})
export class ValidationTaskListService {
  constructor() { }

  isValidTaskList(list:TaskListModel):boolean{
    const { tasks,titulo,descricao } = list;
    let isValid = false;
    if(titulo?.length > 0 && descricao?.length > 0 && Array.isArray(tasks)){
      isValid = true
    }
    return isValid
  }
}
