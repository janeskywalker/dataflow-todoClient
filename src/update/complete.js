


//import {ajax} from '../ajax'

import * as Ajax from '../ajax'
const ajax = Ajax.ajax


import { render } from '../render';

import { Errors, DEFAULT_ERROR} from '../const'

// export function complete(id, state) {

//     const promiseComplete = ajax({
//         url: `http://localhost:4000/api/todos/${id}/complete`,
//         method: Ajax.PUT_METHOD, 
//         data: null, 
//     })

//     promiseComplete.then((todos) => {
//         console.log(todos)
//         render(state)
//     }).catch((err) => {
//         console.log('error')
//     })
// }


export const complete = {
    local(data, state) {
        data.item.completed = true
        render(state)
    },

    remote(data, state, retryComplete){
        const id = data.item.id

        const promiseComplete = ajax({
            url: `http://localhost:4000/api/todos/${id}/complete`,
            method: Ajax.PUT_METHOD, 
            data: null, 
        })
    
        promiseComplete.then((todos) => {
            console.log(todos)

            // getting rid of the error message
            state.error = DEFAULT_ERROR
            state.retryCount = 0

            render(state)
        }).catch((err) => {
            console.log('error')

            // show error widget
            state.error = {
                type: Errors.COMPLETE,
                data: null
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

    }
}