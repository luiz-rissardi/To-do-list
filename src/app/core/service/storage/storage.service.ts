
import { TaskListModel } from '../../model/TaskList';



export class StorageService {
  protected LOCAL_STORAGE_STRING = "local";
  constructor() {
  }
}

export class SaveListsInStorage extends StorageService{
  saveListsInStorage(lists: TaskListModel[]): void {
    try {
      localStorage.setItem(this.LOCAL_STORAGE_STRING, JSON.stringify(lists));
    } catch (error) {
      throw new Error("Erro ao salvar dados");
    }
  }
}


export class GetListsStorage extends StorageService {
  getListsStorage(): TaskListModel[] {
    try {
      return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_STRING) || "[]");
    } catch (error) {
      throw new Error("Erro ao buscar dados");
    }
  }
}
