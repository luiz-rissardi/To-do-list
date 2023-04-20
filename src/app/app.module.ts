import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { ListComponent } from './presentation/list/list.component';
import { TaskComponent } from './presentation/task/task.component';
import { HeaderComponent } from './presentation/share/header/header.component';
import { ShowFeedbackComponent } from './presentation/share/show-feedback/show-feedback.component';
import { TaskListOptionComponent } from './presentation/task-list-option/task-list-option.component';
import { TaskListComponent } from './presentation/task-list/task-list.component';
import { FooterComponent } from './presentation/share/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent,
    HeaderComponent,
    ShowFeedbackComponent,
    TaskListOptionComponent,
    TaskListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
