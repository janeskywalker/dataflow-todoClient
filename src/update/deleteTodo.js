
//import {ajax} from '../ajax'

import * as Ajax from '../ajax'
const ajax = Ajax.ajax


import {render} from '../render/index'
import { Errors, DEFAULT_ERROR} from '../const'

// This pattern of a function taking the next function to call
// as an argument is called continuation passing

export function deleteTodo(data, state, retry) {

    // delete it locally
    // filter is better than splice 
    state.todos = state.todos.filter((next) => next !== data.item)
    const id = data.item.id
    console.log('id:', id)
    render(state)
    
    // delete it on the server side state.todos
    const promiseDelete = ajax({
        url: `http://localhost:4000/api/todos/${id}`,
        method: Ajax.DELETE_METHOD, 
        data: null,
        //forever: true
    })

    // if delete error, auto retry (interal retry)
    // display err message to user to retry, retry button not needed
    // update data to retry (external retry)
    // add delete error widget 

    promiseDelete.then((todos) => {
        console.log(todos)
        
        state.error = DEFAULT_ERROR

        state.retryCount = 0

        render(state)

    }).catch((err) => {
        console.log(err)
        state.error = {
            type: Errors.DELETE,
            data: null
        }

        render(state)

        // state.retryCount += 1
        // console.log('state.retryCount:', state.retryCount)

        // // setTimeout(() => {
        // //     onFailure('delete', state, data)
        // // }, 3000 * state.retryCount)

        // onFailure()

        state.retryCount += 1
        const waitTime = 3000 * state.retryCount

        state.retryCount += 1
        console.log('state.retryCount:', state.retryCount)

        setTimeout(retry, waitTime)
    })

}