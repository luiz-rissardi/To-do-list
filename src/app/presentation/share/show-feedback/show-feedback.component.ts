import { Component, Inject, ViewChild } from '@angular/core';
import { listen } from 'src/app/abstraction/interfaces/listen';
import { WarningHandlerService } from 'src/app/core/service/handlerWarning/handler-warning.service';

@Component({
  selector: 'app-show-feedback',
  templateUrl: './show-feedback.component.html',
  styleUrls: ['./show-feedback.component.scss']
})
export class ShowFeedbackComponent {
  public MessageInfo: string = "";
  @ViewChild("feedback") private feedback!: any;

  constructor(
    @Inject(WarningHandlerService) private listenHandlerWarning: listen,
  ) {
    this.ListenHandler();
  }

  private ListenHandler() {
      this.listenHandlerWarning.ListenFeedBack()
        .subscribe(data => {
          const { typeFeedback, message } = JSON.parse(data);
          this.feedback.nativeElement.classList.add("feedback-" + typeFeedback)
          this.MessageInfo = message;
          this.ShowToast(2500, typeFeedback);
        })
  }

  private ShowToast(timer: number, type: string) {
    try {
      const FeedbackSpan = this.feedback.nativeElement;
      FeedbackSpan.animate([
        { top: "-30px", opacity: 0 },
        { top: "15px", opacity: 1, visibility: "visible" }
      ], { duration: 300 })

      setTimeout(() => {
        FeedbackSpan.animate([
          { top: "-30px", opacity: 0 },
        ], { duration: 300 });
      }, timer);

      setTimeout(() => {
        FeedbackSpan.classList.remove("feedback-" + type);
        this.MessageInfo = ""
      }, timer + 300);
    } catch (error) {
      console.log(error);
    }
  }
}
