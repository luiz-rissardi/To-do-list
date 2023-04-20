import { ReplaySubject } from "rxjs";
import { TaskListModel } from "../model/TaskList";
import { Injectable } from "@angular/core";
import { TaskModel } from "../model/Task";

@Injectable({
    providedIn: "root"
})
export class StateLists {
    private lists: TaskListModel[] = [];
    private ObservablesLists: ReplaySubject<TaskListModel[]> = new ReplaySubject<TaskListModel[]>(1);
    constructor() { }

    GetState(): TaskListModel[] {
        return this.lists
    }

    ListenStateAllLists(): ReplaySubject<TaskListModel[]> {
        return this.ObservablesLists
    }

    SetState(lists: TaskListModel[]): void {
        this.lists = lists;
        this.notifyAll();
    }

    AddList(list: TaskListModel) {
        this.lists.push(list);
        this.notifyAll();
    }

    private notifyAll() {
        this.ObservablesLists.next(this.lists)
    }
}