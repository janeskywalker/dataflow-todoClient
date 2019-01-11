


//import {ajax} from '../ajax'

import * as Ajax from '../ajax'
const ajax = Ajax.ajax


import { render } from '../render';

export function complete(id, state) {

    const promiseComplete = ajax({
        url: `http://localhost:4000/api/todos/${id}/complete`,
        method: Ajax.PUT_METHOD, 
        data: null, 
    })

    promiseComplete.then((todos) => {
        console.log(todos)
        render(state)
    }).catch((err) => {
        console.log('error')
    })


}

