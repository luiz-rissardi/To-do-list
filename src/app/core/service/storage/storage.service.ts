import { Injectable } from '@angular/core';
import { TaskListModel } from '../../model/TaskList';



class StorageService {
  protected LOCAL_STORAGE_STRING = "local";
  constructor() {
  }
}

@Injectable({
  providedIn: 'root'
})
export class SaveListsInStorage extends StorageService{
  saveListsInStorage(lists: TaskListModel[]): void {
    try {
      localStorage.setItem(this.LOCAL_STORAGE_STRING, JSON.stringify(lists));
    } catch (error) {
      throw new Error("Erro ao salvar dados");
    }
  }
}

@Injectable({
  providedIn: 'root' 
})
export class GetListsStorage extends StorageService {
  getListsStorage(): TaskListModel[] {
    try {
      return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_STRING) || "[]");
    } catch (error) {
      throw new Error("Erro ao buscar dados");
    }
  }
}
