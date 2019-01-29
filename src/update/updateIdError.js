import * as Ajax from '../ajax'
const ajax = Ajax.ajax


import {render} from '../render/index'
import { Errors, DEFAULT_ERROR} from '../const'
import { saveTodo } from './saveTodo';

export const updateIdError= {
    local(state, data) {
        
        const newTodos = state.todos.map((todo) => {
            if (todo.localId === data.localId ) {
                const newTodo = Object.assign({}, todo, {id: data.remoteId})
                return newTodo
            }
            return todo
        })


        const newState = Object.assign({}, state, {todos: newTodos, error: data.error})
        
        console.log('state after updated id and err:', newState)
        return newState
    }
}