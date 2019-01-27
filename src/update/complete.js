//import {ajax} from '../ajax'

import * as Ajax from '../ajax'
const ajax = Ajax.ajax

import { render } from '../render'


import { Errors, DEFAULT_ERROR} from '../const'


export const complete = {
    local(data, state) {
        // this still mutate state:
        //data.item.completed = true
        //render(state)

        const newTodos = state.todos.map((todo) => {
            if(todo.id === data.item.id) {
                // this still mutate state:
                // todo.completed = true
                const newTodo = Object.assign({}, todo, {completed: true}) 
                return newTodo
            }
            return todo
        })
        
        const newState = Object.assign({}, state, {todos: newTodos})
        console.log('newState:', newState)
        return newState
        
    },

    remote(data, state, retryComplete) {
        const id = data.item.id

        const promiseComplete = ajax({
            //url: `http://localhost:4000/api/todos/${id}/complete`,
            url: state.url + `/api/todos/${id}/complete`,
            method: Ajax.PUT_METHOD,
            data: null,
        })

        promiseComplete
            .then(todos => {
                console.log(todos)
            //render(state)
        }).catch((err) => {
            console.log('error')
            //render(state)

                // show error widget
                state.error = {
                    type: Errors.COMPLETE,
                    data: null,
                }

                render(state)

                // call updateDate to retryDelete
                state.retryCount += 1
                const waitTime = 3000 * state.retryCount

                // increment again??????
                //state.retryCount += 1
                console.log('state.retryCount:', state.retryCount)

                // can i pass data here????????
                // if i dont wanna wait, but just call it right away
                setTimeout(retryComplete, waitTime)
            })
    },
}
