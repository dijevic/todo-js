

//referencias html

import { todo } from "../classes";
import { list } from '../index';

const divTodoList = document.querySelector('.todo-list');
const input       = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed');
const ulFiltros   = document.querySelector('.filters');
const ancorFiltros =document.querySelectorAll('.filtro')

export const makeHtml = (todo) => {
    const htmlTodo = 
    ` <li class="${  (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
		<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
		<label>${todo.tarea}</label>
		<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    </li>`
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild)

}

//eventos

input.addEventListener('keyup', (events) => {
    if(events.keyCode === 13 && input.value.length > 0){
        const nuevoTodo = new todo(input.value)
        console.log(input.value);
        list.nuevoTodo(nuevoTodo)
        makeHtml(nuevoTodo);
        input.value = ''
    }
})
divTodoList.addEventListener('click',(event)=> {
   const nombreElemento = event.target.localName;
   const todoElemento = event.target.parentElement.parentElement;
   const todoId         = todoElemento.getAttribute('data-id');


   if(nombreElemento.includes('input')){
       list.marcarCompletado(todoId);
       todoElemento.classList.toggle('completed')
   }else if(nombreElemento.includes('button')){
       list.eliminarTodo(todoId);
       divTodoList.removeChild(todoElemento)

   }

   
    console.log(list)

})

btnBorrar.addEventListener('click', ()=> {
    list.eliminarCompletados();

 for(let i = divTodoList.children.length - 1 ; i>= 0 ; i--){

    const elemento = divTodoList.children[i];
    if(elemento.classList.contains('completed')){
        divTodoList.removeChild(elemento);
    }

 }
})

ulFiltros.addEventListener('click', (event) => {
    const filtros = event.target.text;
    if(!filtros) {return};

    ancorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(let elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filtros){
            case 'Pendientes':
                if(completado) { elemento.classList.add('hidden')}
                break;
            
            case 'Completados':
                if(!completado) { elemento.classList.add('hidden')}
                break;

    

        }


    }

})