import * as Ajax from './ajax'
const ajax = Ajax.ajax

import {updateData} from './update'

import {render} from './render'

import {showCompletedItem, showActiveItem, showAllItem} from './show.js'

import {DEFAULT_ERROR, Actions} from './const'

import {input, buttonCompleted, buttonShowAll, buttonShowActive, 
    buttonClearComplete, saveError} from './elements'


// data flow:
// model -> render -> event -> update model-> render 
// -> event -> update model -> render

export const state = {
    error: DEFAULT_ERROR,
    todos: [],
    retryCount: 0,
}

//Event
//const input = document.getElementById('item-input')
input.addEventListener('keypress',(evt) => {
    if (evt.key == 'Enter') {
        const newItem = evt.target.value
        // if (newItem !== '')
        updateData(Actions.ADD_TODO, state, {item: newItem})
    }
})

//const buttonCompleted = document.getElementById('button-completed')
buttonCompleted.addEventListener('click',showCompletedItem)

//const buttonShowAll = document.getElementById('button-show-all')
buttonShowAll.addEventListener('click',showAllItem)

//const buttonShowActive = document.getElementById('button-show-active')
buttonShowActive.addEventListener('click',showActiveItem)

//const buttonClearComplete = document.getElementById('button-clear-completed')
buttonClearComplete.addEventListener('click',(evt) => {
    updateData(Actions.CLEAR_COMPLETE, state)
})



//const saveError = document.getElementById('save-error')
saveError.querySelector('.confirm-btn').addEventListener('click', (evt) => {
    console.log('newthing:', state.error.data)
    // shall pass state.error.data only?
    updateData(Actions.RETRY_SAVE, state)
})

//const deleteError = document.getElementById('delete-error')




// call GET 
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

