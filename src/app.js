import * as Ajax from './ajax'
const ajax = Ajax.ajax

import {updateData} from './update'

import {render} from './render'

//import {showCompletedItem, showActiveItem, showAllItem} from './show.js'

import {DEFAULT_ERROR, Actions, Selectors, Views} from './const'

// import {input, buttonCompleted, buttonShowAll, buttonShowActive, 
//     buttonClearComplete, saveError} from './elements'on

import {getElements} from './elements'




const onSelector = require('onselector').onSelector
console.log('onSelector:', onSelector)




export function app(configObj) {
    // creating a state
    // Initial State
    const state = {
        url: configObj.url,
        rootSelector: configObj.rootSelector,
        error: DEFAULT_ERROR,
        todos: [],
        retryCount: 0,
        elements: null,
        viewState: Views.SHOW_ALL
        //viewState: 'show_all' | 'show_completed' | 'show_active'
        //retryPolicy: configObj.retryPolicy
    }

    state.elements = getElements(configObj.rootSelector)

    console.log('state:', state)


    //Event
    state.elements.input.addEventListener('keypress',(evt) => {
        // debugger
        if (evt.key == 'Enter') {
            const newItem = evt.target.value
            // if (newItem !== '')
            updateData(Actions.ADD_TODO, state, {item: newItem})
        }
    })

    //const buttonCompleted = document.getElementById('button-completed')
    //state.elements.buttonCompleted.addEventListener('click',showCompletedItem)
    state.elements.buttonCompleted.addEventListener('click',() => updateData(Actions.SHOW_COMPLETED, state))

    //const buttonShowAll = document.getElementById('button-show-all')
    state.elements.buttonShowAll.addEventListener('click',() => updateData(Actions.SHOW_ALL, state))

    //const buttonShowActive = document.getElementById('button-show-active')
    //state.elements.buttonShowActive.addEventListener('click', () => showActiveItem(state))

    state.elements.buttonShowActive.addEventListener('click', () => updateData(Actions.SHOW_ACTIVE, state))


    

    //const buttonClearComplete = document.getElementById('button-clear-completed')
    state.elements.buttonClearComplete.addEventListener('click', (evt) => {
        updateData(Actions.CLEAR_COMPLETE, state)
    })

    //const saveError = document.getElementById('save-error')
    state.elements.saveError.querySelector(Selectors.CONFIRM_BUTTON).addEventListener('click', (evt) => {
        console.log('newthing:', state.error.data)
        // shall pass state.error.data only?
        updateData(Actions.RETRY_SAVE, state)
    })

    //const deleteError = document.getElementById('delete-error')




    // call GET 
    // Getting initial data
    const promiseGet = ajax({
        url: 'http://localhost:4000/api/todos',
        method: Ajax.GET_METHOD,
        data: null
    })

    promiseGet.then((todos) => {
        console.log(todos)
        state.todos = todos
        render(state)
    }).catch((err) => {
        console.log('error: ', err)
    })

}




