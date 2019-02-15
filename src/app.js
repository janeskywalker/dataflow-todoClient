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
        console.log('calling messages')
        state = updateData(action, state, data, messages)
        render(state, messages)
    }


    // Event
    // For every event there is an Action (99% true)
    

    onSelector('keypress', Selectors.INPUT, (evt) => {

        if (evt.key == 'Enter') {
            const newItem = evt.target.value
            messages(Actions.ADD_TODO, {item: newItem})
        }
        
    })


    


    onSelector('click', Selectors.BUTTON_COMPLETED, () => {
        // state = updateData(Actions.SHOW_COMPLETED, state)
        // render(state)
        messages(Actions.SHOW_COMPLETED)
    })





    onSelector('click', Selectors.BUTTON_SHOW_ALL, () => {
        // state = updateData(Actions.SHOW_ALL, state)
        // render(state)
        messages(Actions.SHOW_ALL)
    })









    onSelector('click', Selectors.BUTTON_SHOW_ACTIVE, () => {
        // state = updateData(Actions.SHOW_ALL, state)
        // render(state)
        messages(Actions.SHOW_ACTIVE)
    })







    onSelector('click', Selectors.BUTTON_CLEAR_COMPLETE, () => {
        // state = updateData(Actions.SHOW_ALL, state)
        // render(state)
        messages(Actions.CLEAR_COMPLETE)
    })






    // state.elements.saveError.querySelector(Selectors.CONFIRM_BUTTON).addEventListener('click', (evt) => {
    //     //console.log('newthing:', state.error.data)
    //     // shall pass state.error.data only?
    //     //updateData(Actions.RETRY_SAVE, state)
    //     messages(Actions.RETRY_SAVE)
    // })


    onSelector('click', Selectors.CONFIRM_BUTTON, (evt) => {
        //console.log('newthing:', state.error.data)
        messages(Actions.RETRY_SAVE)
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




