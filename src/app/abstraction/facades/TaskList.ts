import { Inject, Injectable } from "@angular/core";

import { TaskModel } from "src/app/core/model/Task";
import { TaskListService } from "src/app/core/service/taskList/task-list.service";
import { WarningHandlerService } from "src/app/core/service/handlerWarning/handler-warning.service";
import { handler } from "../interfaces/handler";
import { SaveListsInStorage } from "src/app/core/service/storage/storage.service";
import { StateLists } from "src/app/core/state/Lists";
import { TaskListModel } from "src/app/core/model/TaskList";

@Injectable({
    providedIn: "root"
})

export class TaskListFacade {
    private lists!: TaskListModel[];
    constructor(
        @Inject(WarningHandlerService) private WarningHandler: handler,
        private taskListService: TaskListService,
        private SaveStorage: SaveListsInStorage,
        private ListsState: StateLists,
    ) {
        this.ListsState.ListenStateAllLists()
            .subscribe((lists: TaskListModel[]) => {
                this.lists = lists
            })
    }

    CreateTask(titulo: string, descricao: string, prioridade: number, duracao: string) {
        try {
            this.taskListService.CreateTask(titulo, descricao, prioridade, duracao);
            this.SaveStorage.saveListsInStorage(this.lists);
            this.WarningHandler.ReportSucess("Task criada com sucesso!");
        } catch (error: any) {
            this.WarningHandler.ReportError(error.message);
        }
    }

    DeleteTask(task:TaskModel):void{
        try {
            this.taskListService.DeleteTask(task);
            this.SaveStorage.saveListsInStorage(this.lists);
            this.WarningHandler.ReportSucess("task removida com sucesso");
        } catch (error) {
            this.WarningHandler.ReportError("não foi possivel removar a task")
        }
    }
}