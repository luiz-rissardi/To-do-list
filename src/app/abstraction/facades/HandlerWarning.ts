import { Injectable } from "@angular/core";
import { WarningHandlerService } from "../../core/service/handlerWarning/handler-warning.service";
import { handler } from "../interfaces/handler";
import { listen } from "../interfaces/listen";
import { Subject } from "rxjs";

@Injectable({
    providedIn:"root"

})
export class WarningHandlerFacade implements handler,listen{
    constructor(private handlerWarning:WarningHandlerService){
    }
    
    //listen
    ListenFeedBack(): Subject<string> {
        return this.handlerWarning.ListenFeedBack();
    }

    //handler
    ReportError(message:string){
        this.handlerWarning.ReportError(message);
    }

    //handler
    ReportSucess(message:string){
        this.handlerWarning.ReportSucess(message);
    }
}