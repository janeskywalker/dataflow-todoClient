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

            clearComplete.local(state, render)
            clearComplete.remote(state, render)
            break;
        }
    } 
}
    