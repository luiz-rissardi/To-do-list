import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef, Type } from '@angular/core';

import { TaskListModel } from 'src/app/core/model/TaskList';
import { StateTaskList } from 'src/app/core/state/TaskList';
import { TaskListFacade } from 'src/app/abstraction/facades/TaskList';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public TaskList!: TaskListModel;
  public TaskForm!: FormGroup;

  constructor(
    private TaskListState: StateTaskList,
    private TaskListFacade: TaskListFacade,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    try {
      this.TaskForm = this.formBuilder.group({
        titulo: [],
        descricao: [],
        prioridade: [],
        duracao: []
      });

      this.TaskListState.ListenStateTaskList()
        .subscribe((tasklits: TaskListModel) => {
          this.TaskList = tasklits;
        });
    } catch (error) {
      console.log(error);
    }
  }

  openModal(modalContent: TemplateRef<any>): void {
    this.modalService.open(modalContent);
  }

  ClearForm(): void {
    const { titulo, descricao, duracao, prioridade } = this.TaskForm.controls;
    titulo.setValue("");
    descricao.setValue("");
    duracao.setValue("");
    prioridade.setValue("");
  }

  CreateTask() {
    const { titulo, descricao, prioridade, duracao } = this.TaskForm.controls;
    this.TaskListFacade.CreateTask(titulo.value, descricao.value, prioridade.value, duracao.value);
  }

}
