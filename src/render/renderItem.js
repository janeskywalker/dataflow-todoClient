import {updateData} from '../update' 
import {Actions} from '../const'
import { render } from '.';


// renderItem (and all render function) should update to take messages
export function renderItem(item, state, messages) {  
    console.log('item:', item)
    const li = document.createElement('li')
    li.innerHTML = item.name
    // set data-localId to identify which item get deleted
    li.dataset.localId = item.localId
    console.log(li)

    const button = document.createElement('button')
    button.innerHTML = 'x'
    li.appendChild(button)

    // add class to delete button
    button.classList.add('delete-btn')

    //this got changed to onSelector and moved to app.js 
    // button.addEventListener('click', (evt) => {
    //     messages(Actions.DELETE, {item: item})
    // })

    const checkbox = document.createElement('input')
    // or checkbox.setAttribute('type', 'checkbox')
    checkbox.type = 'checkbox'
    li.prepend(checkbox)
    checkbox.checked = item.completed

    // add class so app.js can pick it up 
    checkbox.classList.add('checkbox')

    if (item.completed) {
        li.classList.add('checked')
    }
    
    // checkbox.addEventListener('click', (evt) => { 
    //     console.log('item: ', item)
    //     if (item.completed === false) {
    //         // state = updateData(Actions.COMPLETE, state, {item: item})
    //         // render(state)
    //         messages(Actions.COMPLETE, {item: item})
    //     }
    //     else {
    //         // state = updateData(Actions.UNCOMPLETE, state, {item: item})
    //         // render(state)
    //         messages(Actions.UNCOMPLETE, {item: item})
    //     }
    // })
    
    return li
}
