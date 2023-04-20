


export class TaskModel{
    titulo:string;
    descricao:string;
    prioridade:number;
    duracao:string;
    duracaoInMiliseconds:number;
    id:string;
    complete:boolean;

    constructor(titulo:string,descricao:string,prioridade:number,duracaoInMiliseconds:number,duracao:string,id:string){
        this.titulo = titulo;
        this.descricao = descricao;
        this.duracao = duracao;
        this.duracaoInMiliseconds = duracaoInMiliseconds;
        this.prioridade = prioridade;
        this.id = id;
        this.complete = false;
    }
}