import * as Ajax from './ajax'
const ajax = Ajax.ajax


import {updateData} from './updateData'

import {render} from './render'

import {showCompletedItem, showActiveItem, showAllItem} from './show.js'

import {state, ul, input, buttonCompleted, buttonShowAll, buttonShowActive, 
    buttonClearComplete, saveError, deleteError} from './const'



// import {DEFAULT_ERROR, state, ul, input, buttonCompleted, buttonShowAll, buttonShowActive, 
//     buttonClearComplete, saveError, deleteError} from './const'



// data flow:
// model -> render -> event -> update model-> render 
// -> event -> update model -> render




//View




// function showCompletedItem(){
//     if(ul.classList.contains('active')){
//         ul.classList.remove('active')
//     }
//     ul.classList.add('completed')
// }

// function showActiveItem(){
//     if (ul.classList.contains('completed')){
//         ul.classList.remove('completed')
//     }
//     ul.classList.add('active')
// }

// function showAllItem(){
//     ul.classList.remove('completed')
//     ul.classList.remove('active')
// }



//Event
//const input = document.getElementById('item-input')
input.addEventListener('keypress',(evt) => {
    if (evt.key == 'Enter') {
        const newItem = evt.target.value
        // if (newItem !== '')
        updateData('addItem', state, {item: newItem})
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
    updateData('clearCompleted', state)
})





//const saveError = document.getElementById('save-error')
saveError.querySelector('.confirm-btn').addEventListener('click', (evt) => {
    console.log('newthing:', state.error.data)
    updateData('retrySave', state)
})

//const deleteError = document.getElementById('delete-error')




// call GET 
var promiseGet = ajax({
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

