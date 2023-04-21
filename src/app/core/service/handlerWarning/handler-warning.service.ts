import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { handler } from 'src/app/abstraction/interfaces/handler';
import { listen } from 'src/app/abstraction/interfaces/listen';

@Injectable({
  providedIn: 'root'
})
export class WarningHandlerService implements handler,listen{

  private InfoSender:Subject<string> = new Subject<string>();
  constructor() { }

  ListenFeedBack():Subject<string> {
    return this.InfoSender;
  }

  ReportSucess(message:string):void{
    this.SendFeedBack("valid",message);
  }

  ReportError(message:string):void {
    this.SendFeedBack("invalid",message);
  }

  private SendFeedBack(typeFeedback: string,message:string):void {
    const stringify = JSON.stringify({
      typeFeedback,
      message
    })
    this.InfoSender.next(stringify);
  }
}
