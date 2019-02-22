//import {ajax} from '../ajax'

import * as Ajax from '../ajax'
const ajax = Ajax.ajax

import { render } from '../render'

import { Errors, DEFAULT_ERROR } from '../const'

import { Actions } from '../const'

export const complete = {
    local(data, state) {
        // this still mutate state:
        //data.item.completed = true
        //render(state)

        const newTodos = state.todos.map(todo => {
            if (todo.id === data.item.id) {
                // this still mutate state:
                // todo.completed = true
                const newTodo = Object.assign({}, todo, { completed: true })
                return newTodo
            }
            return todo
        })

        const newState = Object.assign({}, state, { todos: newTodos })
        console.log('newState:', newState)
        return newState
    },

    remote(data, state, messages) {
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

                console.log('completed succeeded')
                console.log('messages:', messages)

                messages(Actions.UPDATE_NONE_ERROR)
            })
            .catch(err => {
                console.log('err:', err)

                // show error widget
                // state.error = {
                //     type: Errors.COMPLETE,
                //     data: null
                // }

                //render(state)

                // call updateDate to retryDelete
                // state.retryCount += 1
                // const waitTime = 3000 * state.retryCount

                messages(Actions.RETRY_COMPLETE, data)
            })
    },
}
