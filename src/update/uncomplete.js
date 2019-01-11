


//import {ajax} from '../ajax'

import * as Ajax from '../ajax'
const ajax = Ajax.ajax


import { render } from '../render';

export function uncomplete(id, state) {

    var promiseUncomplete = ajax({
        url: `http://localhost:4000/api/todos/${id}/uncomplete`,
        method: Ajax.PUT_METHOD, 
        data: null, 
    })

    promiseUncomplete.then((todos) => {
        console.log(todos)
        render(state)
    }).catch((err) => {
        console.log('error')
    })

}




// I would suggest exporting an object like this:
// export const uncomplete = {
//     local() {

//     },
//     remote() {

//     }
// }

// const obj = {
//     local: () => {
//         console.log(this)
//     },
//     other() {
//         console.log(this.local())
//     },
//     test: function() {
//         console.log(this.other())
//     }
// }

// obj.local()
// obj.other()
// obj.test()