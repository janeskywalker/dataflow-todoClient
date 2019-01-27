import * as Ajax from './ajax'
const ajax = Ajax.ajax

import {updateData} from './update'

import {render} from './render'

//import {showCompletedItem, showActiveItem, showAllItem} from './show.js'

import {DEFAULT_ERROR, Actions, Selectors, Views} from './const'

// import {input, buttonCompleted, buttonShowAll, buttonShowActive, 
//     buttonClearComplete, saveError} from './elements'on

import {getElements} from './elements'




// app should be the only thing that knows about updateDate and render

export function app(configObj) {
    // creating a state
    // Initial State
    let state = {
        // nextlocalId -- state keeps track on everything(incl. this onelocalId)
        currentId: 0, 
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

    // All action flow through here
    // everywhere updateData is called, replace it with messsages
    function messages(action, data) {
        state = updateData(action, state, data, messages)
        render(state, messages)
    }


    // Event
    // For every event there is an Action (99% true)
    state.elements.input.addEventListener('keypress',(evt) => {
        // debugger

        if (evt.key == 'Enter') {
            const newItem = evt.target.value
            // if (newItem !== '')

            messages(Actions.ADD_TODO, {item: newItem})
        }
    })


    state.elements.buttonCompleted.addEventListener('click',() => {
        state = updateData(Actions.SHOW_COMPLETED, state)
        render(state)
    })

    state.elements.buttonShowAll.addEventListener('click',() => {
        state = updateData(Actions.SHOW_ALL, state)
        render(state)
    })

    state.elements.buttonShowActive.addEventListener('click', () => {
        state = updateData(Actions.SHOW_ACTIVE, state)
        render()
    })


    state.elements.buttonClearComplete.addEventListener('click', (evt) => {
        state = updateData(Actions.CLEAR_COMPLETE, state)
        render(state)
    })

    state.elements.saveError.querySelector(Selectors.CONFIRM_BUTTON).addEventListener('click', (evt) => {
        console.log('newthing:', state.error.data)
        // shall pass state.error.data only?
        updateData(Actions.RETRY_SAVE, state)
    })




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




