
import { TaskModel } from "./Task";


export class TaskListModel {
    titulo: string;
    descricao: string;
    tasks: TaskModel[];
    id: string;

    constructor(titulo: string, descricao: string, id: string) {
        this.descricao = descricao;
        this.titulo = titulo;
        this.tasks = [];
        this.id = id;
    }
}