import { Subject } from "rxjs";
import { TaskListModel } from "../model/TaskList";
import { Injectable } from "@angular/core";
import { TaskModel } from "../model/Task";

@Injectable({
    providedIn: "root"
})
export class StateTaskList {
    private TaskList!: TaskListModel;
    private ObservableTaskList:Subject<TaskListModel> = new Subject<TaskListModel>();
    constructor() {
    }

    ListenStateTaskList(){
        return this.ObservableTaskList;
    }

    SetState(tasklist: TaskListModel) {
        this.TaskList = tasklist;
        this.notifyAll();
    }

    addTask(task: TaskModel) {
        this.TaskList.tasks.push(task);
    }

    removeTask(task: TaskModel) {
        this.TaskList.tasks = this.TaskList.tasks
            .filter((el: TaskModel) => {
                if(el.id !== task.id) {
                    return true;
                } 
                return false;
            })
    }

    private notifyAll(){
        this.ObservableTaskList.next(this.TaskList)
    }
}