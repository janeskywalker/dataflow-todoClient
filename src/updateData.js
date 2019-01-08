
import * as Ajax from './ajax'
const ajax = Ajax.ajax


import {DEFAULT_ERROR, state} from './const.js'

import {saveTodo} from './saveTodo'

import {render} from './render'


export function updateData(how, state, data) {
    //let retries = state.retryCount || 0

    console.log('how: ', how)
    console.log('state: ', state)

    // call post
    if (how === 'addItem') {
    
        const newTodo = {
            id: null,
            name: data.item, 
            completed: false
        }

        // add to the state locally
        state.todos.push(newTodo)
        console.log('state.todos:', state.todos)
       
        saveTodo(newTodo, state).then((state) => {
            render(state)
        })
    }


    if(how === 'retrySave') {

        const newTodo = state.error.data

        console.log('newTodo:', newTodo)

        // add to the state locally
        state.todos.push(newTodo)
        console.log('state.todos:', state.todos)

   
       // add it to the server side state.todos
       saveTodo(newTodo, state).then((state) => {
            render(state)
        })
    }



    else if (how === 'delete') {
        // call delete
        const index = state.todos.indexOf(data.item) 
        //console.log('index:', index)

        const id = data.item.id
        console.log('id:', id)

        //delete it locally, data on the server stay on the server 
        // state.todos.splice(state.todos.indexOf(data.item),1)
        // filter is better than splice 
        state.todos = state.todos.filter((next) => next !== data.item)
        
        // delete it on the server side state.todos
        const promiseDelete = ajax({
            url: `http://localhost:4000/api/todos/${id}`,
            method: 'DELETE', 
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
                type: 'deleteError',
                data: null
            }

            render(state)

            state.retryCount += 1
            console.log('state.retryCount:', state.retryCount)

            setTimeout(() => {
                updateData('delete', state, data)
            }, 3000 * state.retryCount)
        })
    }


    else if (how === 'complete') {
        data.item.completed = true
        // call put
        const id = data.item.id

        const promiseComplete = ajax({
            url: `http://localhost:4000/api/todos/${id}/complete`,
            method: 'PUT', 
            data: null, 
        })

        promiseComplete.then((todos) => {
            console.log(todos)
        }).catch((err) => {
            console.log('error')
        })


    }

    else if (how === 'uncomplete') {
        data.item.completed = false
        var id = data.item.id
        // call put    
         var promiseUncomplete = ajax({
            url: `http://localhost:4000/api/todos/${id}/uncomplete`,
            method: 'PUT', 
            data: null, 
        })

        promiseUncomplete.then((todos) => {
            console.log(todos)
        }).catch((err) => {
            console.log('error')
        })
    }

    else if (how === 'clearCompleted'){

        const completedTodos = state.todos.filter((next) =>{
            return next.completed === true  
        })

        console.log('completedTodos', completedTodos)
        const idArr = {
            arr: []
        }

        completedTodos.forEach((next) => idArr.arr.push(next.id))

        //console.log('idArr.arr', idArr.arr)

        // call post to send data, not delete

        const promiseClearComplete = ajax({
            url: 'http://localhost:4000/api/todos/clearcompleted',
            method: 'POST',
            data: idArr,
        })

        promiseClearComplete.then((todos) => {
            console.log(todos)
        }).catch((err) => {
            console.log('error')
            //renderError()
        })

        // update locally using filter
        state.todos = state.todos.filter((next) =>{
            return next.completed === false  
        })
    }

    console.log('state.todos:', state.todos)
    render(state) 
}

