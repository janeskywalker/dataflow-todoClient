import { addTodo } from './addTodo' 
import { updateIdError } from './updateIdError'
import { updateSaveError } from './updateSaveError'
import { retrySave } from './retrySave'

import { deleteTodo } from './deleteTodo'
import { updateNoneError} from './updateNoneError'
import { retryDelete } from './retryDelete'

import { complete } from './complete'
import { uncomplete } from './uncomplete'
import { clearComplete } from './clearComplete'
import { render } from '../render'

import {Actions, Views} from '../const'
import { saveTodo } from './saveTodo';

// How do we change update to be pure?
// update takes a state and an action and returns the new state
export function updateData(action, state, data, messages) {

    console.log('action: ', action)
    console.log('state: ', state)

    switch (action) {
        case Actions.ADD_TODO: {
        
            const newTodo = {
                id: null,
                localId: state.currentId, // So we can update 'id' later
                name: data.item, 
                completed: false,
                isDeleted: false,
            }

            // Update id for next time
            const stateWithUpdatedId = Object.assign({}, state, { currentId: state.currentId += 1 })

            const newState = addTodo.local(newTodo, stateWithUpdatedId, render)
            console.log('newState:',newState )
            
            addTodo.remote(newTodo, state, messages)
            
            return newState
        }

        case Actions.UPDATE_ID_ERROR: {
             const newState = updateIdError.local(state, data)
             return newState
        }


       case Actions.UPDATE_SAVE_ERROR: {
        const newState = updateSaveError.local(state, data)
        return newState
   }

        case Actions.RETRY_SAVE: {
            retrySave.remote(state, messages)
            break;
        }

        case Actions.DELETE:{
            const newState = deleteTodo.local(data, state)
            deleteTodo.remote(data, state, messages)

            return newState
        }

        case Actions.UPDATE_NONE_ERROR:{
            const newState = updateNoneError.local(state)

            return newState
        }

        case Actions.RETRY_DELETE:{
            const newState = retryDelete.local(data, state)
            retryDelete.remote(data, state, messages)

            return newState
        }

        case Actions.COMPLETE: {
            //complete(id, state)
            const newState = complete.local(data, state)
            complete.remote(data, state, () => {
                updateData(Actions.COMPLETE, state, data)
            })
            
            return newState
            //break;
        }

        case Actions.UNCOMPLETE: {
            const newState = uncomplete.local(data, state)
            uncomplete.remote(data, state, () => {
                updateData(Actions.UNCOMPLETE, state, data)
            })

            return newState
            //break;
        }

        case Actions.CLEAR_COMPLETE: {

            const newState = clearComplete.local(state, render)
            clearComplete.remote(state, render, () => {
                updateData(Actions.CLEAR_COMPLETE, state)
            })
            return newState
        }

        case Actions.SHOW_ACTIVE: {
            //state.viewState = Views.SHOW_ACTIVE
            //render(state)
            const newState = Object.assign({}, state, {viewState: Views.SHOW_ACTIVE})
            return newState
        }
        case Actions.SHOW_ALL: {
            //state.viewState = Views.SHOW_ALL
            //render(state)

            const newState = Object.assign({}, state, {viewState: Views.SHOW_ALL})
            return newState
        }
        case Actions.SHOW_COMPLETED: {
            //state.viewState = Views.SHOW_COMPLETED
            //render(state)

            const newState = Object.assign({}, state, {viewState: Views.SHOW_COMPLETED})
            return newState
        }
        
    } 
    return newState
}
