import * as Ajax from '../ajax'
const ajax = Ajax.ajax

import { DEFAULT_ERROR } from '../const'

/**
 *
 * @param {object} newTodo
 * @param {object} state
 */
export function saveTodo(newTodo, state) {
    const promiseAdd = ajax({
        //url: 'http://localhost:4000/api/todos',
        url: state.url + '/api/todos',
        method: Ajax.POST_METHOD,
        data: newTodo,

        retryPolicy: {
            maxRetries: 3,
            waitTime: 1000, 
            timeout: 30000
        }
    })

    return promiseAdd.then((savedTodo) => {
        console.log('savedTodo:', savedTodo)
        // update locally
        // add the id to client side state.todos

        newTodo.id = savedTodo.id

        //state.todos.push(savedTodo)
        state.error = DEFAULT_ERROR

        // render(state)
        console.log('state.todos after saved:', state.todos)
        return state 
        
    }).catch((err) => {
        console.log('error: ', err)

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
