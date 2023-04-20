import { Component, ElementRef, OnInit, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TaskListModel } from 'src/app/core/model/TaskList';
import { StateLists } from 'src/app/core/state/Lists';
import { ListsFacade } from 'src/app/abstraction/facades/Lists';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public lists!: TaskListModel[];
  public FormTaskList!: FormGroup;
  @ViewChildren("item") itens!:QueryList<ElementRef<HTMLLIElement>>

  constructor(
    private taskListFacade: ListsFacade,
    private listsState: StateLists,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dom:Renderer2
  ) {
  }
  ngOnInit(): void {
    this.FormTaskList = this.formBuilder.group({
      titulo: [],
      descricao: [],
    });

    this.taskListFacade.StartStatement();
    this.listsState.ListenStateAllLists()
      .subscribe((lists: TaskListModel[]) => {
        this.lists = lists;
      })
  }

  openModal(modalContent: TemplateRef<any>): void {
    this.modalService.open(modalContent);
  }

  active(element:HTMLLIElement){
    this.itens.map(el=>{
      el.nativeElement.classList.remove("active");
    })
    element.classList.add("active"); 
  }

  ClearForm(): void {
    const { titulo, descricao } = this.FormTaskList.controls;
    titulo.setValue("");
    descricao.setValue("");
  }

  CreateList(): void {
    const { titulo, descricao } = this.FormTaskList.controls;
    this.taskListFacade.CreateList(titulo.value, descricao.value);
  }

  DeleteTaskList(list: TaskListModel): void {
    this.taskListFacade.RemoveTaskList(list);
  }
}
