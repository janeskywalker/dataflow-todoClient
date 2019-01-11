

//import {ajax} from '../ajax'

import * as Ajax from '../ajax'
const ajax = Ajax.ajax


import { render } from '../render';

//export function clearComplete(idArr, state) {

export const clearComplete = {

    local(state) {

        // update locally using filter
        state.todos = state.todos.filter((next) =>{
            return next.completed === false  
        })

        render(state)

    },

    remote(state) {

        const completedTodos = state.todos.filter((next) =>{
            return next.completed === true  
        })
        console.log('completedTodos', completedTodos)

        const idArr = {
            arr: []
        }

        completedTodos.forEach((next) => idArr.arr.push(next.id))

        console.log('idArr.arr', idArr.arr)


        // call post to send data, not delete
        const promiseClearComplete = ajax({
            url: 'http://localhost:4000/api/todos/clearcompleted',
            method: Ajax.POST_METHOD,
            data: idArr,
        })
    
        promiseClearComplete.then((todos) => {
            console.log('after CC', todos)
            //render(state)
        }).catch((err) => {
            console.log('error')
            //renderError()
        })

        

    }
    
}






