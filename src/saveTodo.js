
import * as Ajax from './ajax'
const ajax = Ajax.ajax

import {DEFAULT_ERROR, state} from './const.js'



export function saveTodo(newTodo, state) {
    const promiseAdd = ajax({
        url: 'http://localhost:4000/api/todos',
        method: Ajax.POST_METHOD,
        data: newTodo,

        retryPolicy: {
            maxRetries: 3,
            waitTime: 1000, 
            timeout: 30000
        }

        //retryPolicy: null
    })

    return promiseAdd.then((savedTodo) => {
        console.log(savedTodo)
        // update locally
        // add the id to client side state.todos

        newTodo.id = savedTodo.id

        state.error = DEFAULT_ERROR

        // render(state)
        return state 
        
    }).catch((err) => {
        console.log('error: ', err)
        state.todos.pop()

        // define the error object
        state.error = {
            type: 'saveError',
            data: newTodo
        }

        console.log(state.error.data)
        console.log('state:', state)

        // render(state)
        return state 
    })
}