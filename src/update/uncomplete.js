//import {ajax} from '../ajax'

import * as Ajax from '../ajax'
const ajax = Ajax.ajax

import { render } from '../render'

import { Errors, DEFAULT_ERROR } from '../const'

export const uncomplete = {
    local(data, state){
        // this still mutate state:
        //data.item.completed = false

        const newTodos = state.todos.map((todo) => {
            if(todo.id === data.item.id) {
                const newTodo = Object.assign({}, todo, {completed: false}) 
                return newTodo
            }
            return todo
        })
        
        const newState = Object.assign({}, state, {todos: newTodos})
        return newState
    },

    remote(data, state, retryUncomplete) {
        const id = data.item.id

        var promiseUncomplete = ajax({
                    url: `http://localhost:4000/api/todos/${id}/uncomplete`,
                    method: Ajax.PUT_METHOD, 
                    data: null, 
                })
            
                promiseUncomplete.then((todos) => {
                    console.log(todos)

                    state.error = DEFAULT_ERROR
                    state.retryCount = 0
                    //render(state)
                }).catch((err) => {
                    console.log('error')

                    state.error = {
                        type: Errors.UNCOMPLETE,
                        date: null
                    }
                    //render(state)

                    state.retryCount +=1
                    console.log(state.retryCount)

                    const waitTime = state.retryCount * 3000 
                    setTimeout(retryUncomplete, waitTime)
                })
    }
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
