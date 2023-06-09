import { Inject, Injectable } from "@angular/core";

import { TaskListModel } from "../../core/model/TaskList";
import { ListService } from "../../core/service/lists/lists-service.service";
import { GetListsStorage, SaveListsInStorage } from "../../core/service/storage/storage.service";
import { StateLists } from "../../core/state/Lists";
import { WarningHandlerService } from "../../core/service/handlerWarning/handler-warning.service";
import { handler } from "../interfaces/handler";

@Injectable({
    providedIn: "root"
})
export class ListsFacade{
    constructor(
        @Inject("") private ListsService: ListService,
        private GetStorage: GetListsStorage,
        private SaveStorage: SaveListsInStorage,
        private ListsState: StateLists,
        @Inject(WarningHandlerService) private WarningHandler: handler
    ) {
        this.StartStatement();
    }

    CreateList(titulo: string, descricao: string): void {
        try {
            this.ListsService.CreateTaskList(titulo, descricao);
            this.SaveStorage.saveListsInStorage(this.ListsState.GetState());
            this.WarningHandler.ReportSucess("Dados Salvos com sucesso!");
        } catch (error: any) {
            this.WarningHandler.ReportError(error.message)
        }
    }

    RemoveTaskList(list: TaskListModel): void {
        try {
            this.ListsService.DeleteTaskList(list);
            this.SaveStorage.saveListsInStorage(this.ListsState.GetState());
            this.WarningHandler.ReportSucess("Lista Removida com sucesso");
        } catch (error: any) {
            this.WarningHandler.ReportError(error.message)
        }
    }

    private StartStatement(): void {
        try {
            const lists = this.GetStorage.getListsStorage();
            lists.forEach(el => this.ListsState.AddList(el))
        } catch (error: any) {
            this.WarningHandler.ReportError(error.message)
        }
    }
}