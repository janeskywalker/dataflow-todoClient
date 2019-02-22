//import {ajax} from '../ajax'

import * as Ajax from '../ajax'
const ajax = Ajax.ajax

import { Errors, DEFAULT_ERROR } from '../const'

import { Actions } from '../const'

import { render } from '../render'

//export function clearComplete(idArr, state) {

export const clearComplete = {
    local(state, render) {
        // update locally using filter
        // state.todos = state.todos.filter((next) =>{
        //     return next.completed === false
        // })

        // this is better bc it makes your code more resilient

        // state.todos = state.todos.map((next) => {
        //     if(next.completed === true) {
        //         next.isDeleted = true
        //     }
        //     return next
        // })
        //console.log('isDeleted:', state.todos)
        //render(state)

        const newTodos = state.todos.map(todo => {
            //debugger
            if (todo.completed === true) {
                const newTodo = Object.assign({}, todo, { isDeleted: true })
                return newTodo
            }
            return todo
        })

        const newState = Object.assign({}, state, { todos: newTodos })
        console.log('newState:', newState)
        return newState
    },

    remote(state, messages) {
        const completedTodos = state.todos.filter(next => {
            return next.completed === true
        })
        console.log('completedTodos', completedTodos)

        const idArr = {
            arr: [],
        }

        completedTodos.forEach(next => idArr.arr.push(next.id))

        console.log('idArr.arr', idArr.arr)

        // call post to send data, not delete
        const promiseClearComplete = ajax({
            //url: 'http://localhost:4000/api/todos/clearcompleted',
            url: state.url + '/api/todos/clearcompleted',

            method: Ajax.POST_METHOD,
            data: idArr,
        })

        promiseClearComplete
            .then(todos => {
                messages(Actions.UPDATE_NONE_ERROR)
            })
            .catch(err => {
                // call updateDate to retryDelete
                state.retryCount += 1
                const waitTime = 3000 * state.retryCount

                // make a cc error widget to show
                // call updateDate to retry cc

                // show error widget
                // state.error = {
                //     type: Errors.CLEAR_COMPLETED,
                //     data: null
                // }

                // render(state)

                // call updateDate to retryDelete
                // state.retryCount += 1
                // const waitTime = 3000 * state.retryCount

                // console.log('state.retryCount:', state.retryCount)

                // setTimeout(retryClearCompleted, waitTime)

                messages(Actions.RETRY_CLEAR_COMPLETE, idArr)
            })
    },
}
