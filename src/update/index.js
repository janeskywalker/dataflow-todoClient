import { addTodo } from './addTodo'
import { retrySave } from './retrySave'
import { deleteTodo } from './deleteTodo'
import { complete } from './complete'
import { uncomplete } from './uncomplete'
import { clearComplete } from './clearComplete'
import { render } from '../render'


import {Actions, Views} from '../const'

// How do we change update to be pure?
// update takes a state and an action and returns the new state
export function updateData(action, state, data) {

    console.log('action: ', action)
    console.log('state: ', state)

    switch (action) {
        case Actions.ADD_TODO: {
            // pass render as an argument
            //addTodo(data, state, render)

            // make it here and pass it instead
            const newTodo = {
                id: null,
                name: data.item,
                completed: false,
                isDeleted: false,
            }

            addTodo.local(newTodo, state, render)
            addTodo.remote(newTodo, state, render)
            break
        }

        case Actions.RETRY_SAVE: {
            //retrySave(state)
            retrySave.remote(state)
            break
        }

        case Actions.DELETE: {
            deleteTodo.local(data, state)
            deleteTodo.remote(data, state, () => {
                updateData(Actions.DELETE, state, data)
            })
            break
        }

        case Actions.COMPLETE: {
            complete.local(data, state)
            complete.remote(data, state, () => {
                updateData(Actions.COMPLETE, state, data)
            })
            break
        }

        case Actions.UNCOMPLETE: {
            uncomplete.local(data, state)
            uncomplete.remote(data, state, () => {
                updateData(Actions.UNCOMPLETE, state, data)
            })

            break
        }

        case Actions.CLEAR_COMPLETE: {
            clearComplete.local(state, render)
            clearComplete.remote(state, render, () => {
                updateData(Actions.CLEAR_COMPLETE, state)
            })
            break
        }

        case Actions.SHOW_ACTIVE: {
            state.viewState = Views.SHOW_ACTIVE
            render(state)
            break
        }
        case Actions.SHOW_ALL: {
            state.viewState = Views.SHOW_ALL
            render(state)
            break
        }
        case Actions.SHOW_COMPLETED: {
            state.viewState = Views.SHOW_COMPLETED
            render(state)
            break
        }

        case Actions.SHOW_ACTIVE: {
            state.viewState = Views.SHOW_ACTIVE
            render(state)
            break;
        }
        case Actions.SHOW_ALL: {
            state.viewState = Views.SHOW_ALL
            render(state)
            break;
        }
        case Actions.SHOW_COMPLETED: {
            state.viewState = Views.SHOW_COMPLETED
            render(state)
            break;
        }
    }
}
