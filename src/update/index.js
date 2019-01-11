import { addTodo } from './addTodo' 
import { retrySave } from './retrySave'
import { deleteTodo } from './deleteTodo'
import { complete } from './complete'
import { uncomplete } from './uncomplete'
import { clearComplete } from './clearComplete'
import { render } from '../render'


import {Actions} from '../const'


// Refactor:
// 1. Update this to use a switch
// 2. Add actions ('addItem', 'retrySave' ...) to const.js
// 3. Split each action to its own function
// 4. addTodo.js will import saveTodo, but pass render as an agument

export function updateData(how, state, data) {
    //let retries = state.retryCount || 0

    console.log('how: ', how)
    console.log('state: ', state)

    switch (how) {
        case Actions.ADD_TODO: {
            // pass render as an argument
            addTodo(data, state, render)
            break;
        }
        case Actions.RETRY_SAVE: {
            retrySave(state)
            break;
        }
        case Actions.DELETE:{
            //const index = state.todos.indexOf(data.item) 
            //console.log('index:', index)

            // call delete
            // deleteTodo(data, state, updateData)
            deleteTodo(data, state, () => {
                updateData(Actions.DELETE, state, data)
            })
            break;
        }
            
        case Actions.COMPLETE: {
            // this should be in complete function if all other local
            // state management is going to be in the child functions
            data.item.completed = true
            // call put
            const id = data.item.id

            complete(id, state)
            break;
        }
        case Actions.UNCOMPLETE: {
            data.item.completed = false
            const id = data.item.id
            // call put    
            uncomplete(id, state)
            break;
        }
        case Actions.CLEAR_COMPLETE: {

            //clearComplete(state)

            //clearComplete.local(state, render)
            console.log('local')
            clearComplete.remote(state, render)
            break;
        }
    } 
}
    // call post
//     if (how === 'addItem') {
    
//         const newTodo = {
//             id: null,
//             name: data.item, 
//             completed: false
//         }

//         addTodo(newTodo, state)
//     }


//     if(how === 'retrySave') {

//         const newTodo = state.error.data
//         //console.log('newTodo:', newTodo)

//         retrySave(newTodo, state)
//     }



//     else if (how === 'delete') {
//         // call delete
//         const index = state.todos.indexOf(data.item) 
//         //console.log('index:', index)

//         // what shall be pass?
//         deleteTodo(data, state)
        
//     }


//     else if (how === 'complete') {
//         data.item.completed = true
//         // call put
//         const id = data.item.id

//         const promiseComplete = ajax({
//             url: `http://localhost:4000/api/todos/${id}/complete`,
//             method: Ajax.PUT_METHOD, 
//             data: null, 
//         })

//         promiseComplete.then((todos) => {
//             console.log(todos)
//         }).catch((err) => {
//             console.log('error')
//         })


//     }

//     else if (how === 'uncomplete') {
//         data.item.completed = false
//         var id = data.item.id
//         // call put    
//          var promiseUncomplete = ajax({
//             url: `http://localhost:4000/api/todos/${id}/uncomplete`,
//             method: Ajax.PUT_METHOD, 
//             data: null, 
//         })

//         promiseUncomplete.then((todos) => {
//             console.log(todos)
//         }).catch((err) => {
//             console.log('error')
//         })
//     }

//     else if (how === 'clearCompleted'){

//         const completedTodos = state.todos.filter((next) =>{
//             return next.completed === true  
//         })

//         console.log('completedTodos', completedTodos)
//         const idArr = {
//             arr: []
//         }

//         completedTodos.forEach((next) => idArr.arr.push(next.id))

//         //console.log('idArr.arr', idArr.arr)

//         // call post to send data, not delete

//         const promiseClearComplete = ajax({
//             url: 'http://localhost:4000/api/todos/clearcompleted',
//             method: Ajax.POST_METHOD,
//             data: idArr,
//         })

//         promiseClearComplete.then((todos) => {
//             console.log(todos)
//         }).catch((err) => {
//             console.log('error')
//             //renderError()
//         })

//         // update locally using filter
//         state.todos = state.todos.filter((next) =>{
//             return next.completed === false  
//         })
//     }

//     console.log('state.todos:', state.todos)
//     render(state) 
// }

