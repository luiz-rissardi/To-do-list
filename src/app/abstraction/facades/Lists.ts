import { Inject, Injectable } from "@angular/core";

import { TaskListModel } from "src/app/core/model/TaskList";
import { ListService } from "src/app/core/service/Lists/lists-service.service";
import { GetListsStorage, SaveListsInStorage } from "src/app/core/service/storage/storage.service";
import { StateLists } from "src/app/core/state/Lists";
import { WarningHandlerService } from "src/app/core/service/handlerWarning/handler-warning.service";
import { handler } from "./interfaces/handler";


@Injectable({
    providedIn: "root"
})
export class ListsFacade {
    private lists!: TaskListModel[];
    constructor(
        private ListsService: ListService,
        private GetStorage: GetListsStorage,
        private SaveStorage: SaveListsInStorage,
        private ListsState: StateLists,
        @Inject(WarningHandlerService) private WarningHandler: handler
    ) {
        this.ListsState.ListenStateAllLists()
            .subscribe((lists: TaskListModel[]) => {
                this.lists = lists
            })
    }

    StartStatement(): void {
        try {
            const lists = this.GetStorage.getListsStorage();
            this.ListsState.SetState(lists);
        } catch (error: any) {
            this.WarningHandler.ReportError(error.message)
        }
    }


    CreateList(titulo: string, descricao: string): void {
        try {
            this.ListsService.CreateTaskList(titulo, descricao);
            this.SaveStorage.saveListsInStorage(this.lists);
            this.WarningHandler.ReportSucess("Dados Salvos com sucesso!");
        } catch (error: any) {
            this.WarningHandler.ReportError(error.message)
        }
    }

    RemoveTaskList(list: TaskListModel): void {
        try {
            this.ListsService.RemoveTaskList(list);
            this.SaveStorage.saveListsInStorage(this.lists);
            this.WarningHandler.ReportSucess("Lista Removida com sucesso");
        } catch (error: any) {
            this.WarningHandler.ReportError(error.message)
        }
    }
}