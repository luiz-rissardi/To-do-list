
import { Inject, Injectable } from "@angular/core";
import { WarningHandlerService } from "src/app/core/service/handlerWarning/handler-warning.service";
import { TaskService } from "src/app/core/service/task/task.service";
import { handler } from "./interfaces/handler";


@Injectable({
    providedIn:"root"
})

export class TaskFacade{
    constructor(
        private taskService:TaskService,
        @Inject(WarningHandlerService) private WarningHandler:handler
    ){

    }

    StartTimeoutTask(){
        try {
            this.taskService.TimerToRemoveTask();
        } catch (error) {
            this.WarningHandler.ReportError("não foi possivel iniciar cronometro da task");
        }
    }
}