
import './style.css' ;
import {todoList,todo} from './classes';
import{makeHtml} from './js/componentes'

export const list = new todoList();

list.todos.forEach(makeHtml);
