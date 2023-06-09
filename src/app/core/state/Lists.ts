import { ReplaySubject } from "rxjs";
import { TaskListModel } from "../model/TaskList";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})
export class StateLists {
    private lists: Set<TaskListModel> = new Set();
    private ObservableLists: ReplaySubject<TaskListModel[]> = new ReplaySubject<TaskListModel[]>(1);
    constructor() { }

    GetState(): TaskListModel[] {
        return this.toArray(this.lists);
    }

    ListenStateAllLists(): ReplaySubject<TaskListModel[]> {
        return this.ObservableLists
    }

    AddList(list: TaskListModel):void {
        this.lists.add(list);
        this.notifyAll();
    }

    RemoveList(list:TaskListModel):void{
        this.lists.delete(list);
        this.notifyAll();
    }

    private toArray(lists:Set<TaskListModel>){
        const arr :TaskListModel[] = [];
        lists.forEach(el => arr.push(el));
        return arr;
    }

    private notifyAll():void {
        const arr = this.toArray(this.lists);
        this.ObservableLists.next(arr);
    }
}