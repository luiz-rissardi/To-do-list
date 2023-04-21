import { Injectable } from '@angular/core';
import { TaskModel } from '../../model/Task';

@Injectable({
  providedIn: 'root'
})
export class ValidationTaskService {
  constructor() { }

  isValidTask(task:TaskModel):boolean{
    const { titulo,descricao,prioridade,duracao} = task;
    if(titulo?.length > 0 && descricao?.length>0 && duracao != undefined && prioridade != null){
      return true
    }    
    return false
  }

  taskTimeHasAlreadyExpired(task:TaskModel){
    return new Date(task.duracao).getTime() < Date.now();
  }
}
