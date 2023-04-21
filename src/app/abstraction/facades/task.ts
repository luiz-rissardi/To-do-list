
import { Inject, Injectable } from "@angular/core";
import { WarningHandlerService } from "src/app/core/service/handlerWarning/handler-warning.service";
import { TaskService } from "src/app/core/service/task/task.service";
import { handler } from "../interfaces/handler";
import { TaskListModel } from "src/app/core/model/TaskList";
import { StateLists } from "src/app/core/state/Lists";
import { SaveListsInStorage } from "src/app/core/service/storage/storage.service";
import { TaskModel } from "src/app/core/model/Task";
import { TaskListService } from "src/app/core/service/TaskList/task-list.service";


@Injectable({
    providedIn: "root"
})

export class TaskFacade {
    private TaskLists: TaskListModel[] = [];
    constructor(
        private SaveStorage: SaveListsInStorage,
        private TaskService: TaskService,
        private ListsState: StateLists,
    @Inject(WarningHandlerService) private WarningHandler: handler
    ) {
        this.ListsState.ListenStateAllLists()
            .subscribe((TaskLists: TaskListModel[]) => {
                this.TaskLists = TaskLists;
            })
    }

    StartTimeoutTask() {
        try {
            this.TaskService.StartTimerToRemoveTask();
            this.SaveStorage.saveListsInStorage(this.TaskLists)
        } catch (error) {
            this.WarningHandler.ReportError("não foi possivel iniciar cronometro da task");
        }
    }

    toggleCompleteTask(task: TaskModel) {
        try {
            this.TaskService.toogleComplete(task);
            this.SaveStorage.saveListsInStorage(this.TaskLists);
        } catch (error) {
            console.log(error);
        }
    }
}