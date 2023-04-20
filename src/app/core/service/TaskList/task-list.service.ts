import { Injectable } from '@angular/core';
import { TaskModel } from '../../model/Task';
import { StateTaskList } from '../../state/TaskList';
import { ValidationTaskService } from '../../validation/Task/valid-task.service';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  constructor(
    private taskListsState: StateTaskList,
    private TaskValidations: ValidationTaskService
  ) { }

  CreateTask(titulo: string, descricao: string, prioridade: number, duracao: string) {
    const duracaoInMiliseconds = new Date(duracao).getTime() - Date.now();
    const task = new TaskModel(titulo, descricao, prioridade, duracaoInMiliseconds, duracao, this.GenerateId());
    if (this.TaskValidations.isValidTask(task)) {
      if (duracaoInMiliseconds > 1) {
        this.taskListsState.addTask(task);
      } else {
        throw new Error("Data de terminio invalida! Informe uma data a partir de hoje")
      }
    } else {
      throw new Error("Campos Não preenchidos")
    }
  }

  DeleteTask(task: TaskModel): void {
    this.taskListsState.removeTask(task);
  }

  private GenerateId(): string {
    return String(Math.floor(Math.random() * 99999999 + 1));
  }
}
