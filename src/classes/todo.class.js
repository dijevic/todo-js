
export class todo{

    static fromJson({tarea,id,completado,creado}){
        const tempTodo = new todo(tarea);
        this.id = id;
        this.creado = creado;
        this.completado = completado;
        return tempTodo;
    }



    constructor(tarea) {
        this.tarea = tarea;
        this.id    = new Date().getTime();
        this.completado = false;
        this.creado     = new Date;
    }
}