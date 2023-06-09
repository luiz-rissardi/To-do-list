import { Inject, Injectable } from '@angular/core';
import { WarningHandlerService } from '../handlerWarning/handler-warning.service';
import { handler } from 'src/app/abstraction/interfaces/handler';
import { TaskModel } from '../../model/Task';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private SOUND_NOTIFICATION = new Audio( "../../../../assets/sound/notification-expired.mp3");
  
  constructor(
    @Inject(WarningHandlerService) private WarningHandler: handler
  ) { }

  async NotifyTaskExpired(task:TaskModel){
    try {
      await this.SOUND_NOTIFICATION.play();
      this.WarningHandler.ReportSucess(`A task ${task.titulo} expirou !`);
    } catch (error:any) {
      this.WarningHandler.ReportError(error.message)
    }
  }
}
