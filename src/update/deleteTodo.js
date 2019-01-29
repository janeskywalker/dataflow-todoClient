//import {ajax} from '../ajax'

import * as Ajax from '../ajax'
const ajax = Ajax.ajax

import { render } from '../render/index'
import { Errors, DEFAULT_ERROR } from '../const'

// This pattern of a function taking the next function to call
// as an argument is called continuation passing

export const deleteTodo = {
    local(data, state) {
        // delete it locally
        // filter is better than splice 

        // state.todos = state.todos.filter((next) => next !== data.item)
        // console.log('state.todo:', state.todo)
        // render(state)
        const newTodos = state.todos.filter((next) => next !== data.item)

        const newState = Object.assign({}, state, {
            todos: newTodos
        })

        //console.log('state.todo:', state.todo)
        console.log('newState:', newState)
        
        return newState
    },

    remote(data, state, messages, retryDelete) {
        const id = data.item.id
        console.log('id:', id)

        // delete it on the server side state.todos
        const promiseDelete = ajax({
            //url: `http://localhost:4000/api/todos/${id}`,
            url: state.url + `/api/todos/${id}`,
            method: Ajax.DELETE_METHOD,
            data: null,
            //forever: true
        })

        // if delete error, auto retry (interal retry)
        // display err message to user to retry, retry button not needed
        // update data to retry (external retry)
        // add delete error widget

        promiseDelete
            .then(todos => {
                console.log(todos)

                // getting rid of the error message
                state.error = DEFAULT_ERROR
                state.retryCount = 0

            //render(state)
            //messages(Actions.update_Error, {error: DEFAULT_ERROR, retryCount:0 })

                // show error widget
                state.error = {
                    type: Errors.DELETE,
                    data: null,
                }

            //show error widget
            state.error = {
                type: Errors.DELETE,
                data: null
            }

            //render(state)

                // increment again??????
                //state.retryCount += 1
                console.log('state.retryCount:', state.retryCount)

            // increment again??????
            //state.retryCount += 1
            console.log('state.retryCount:', state.retryCount)

             // can i pass data here????????
             // if i dont wanna wait, but just call it right away

            //  messages(Actions.UPDATE_DELETE_ERROR, 
            //     { retryCount: state.retryCount + 1, 
            //       error: {
            //             type: Errors.DELETE,
            //             data: null
            //       }
            //     }
            // )

            setTimeout(retryDelete, waitTime)
        })

    }
} 
