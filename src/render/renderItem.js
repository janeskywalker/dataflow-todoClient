import {updateData} from '../update' 
import {Actions} from '../const'


export function renderItem(item, state) {

    const li = document.createElement('li')
    li.innerHTML = item.name

    const button = document.createElement('button')
    button.innerHTML = "x"
    li.appendChild(button)
    button.addEventListener('click', (evt) => {
        updateData(Actions.DELETE, state, {item: item})
    })

    const checkbox = document.createElement('input')
    // or checkbox.setAttribute('type', 'checkbox')
    checkbox.type = 'checkbox'
    li.prepend(checkbox)
    checkbox.checked = item.completed

    if (item.completed) {
        li.classList.add('checked')
    }
    
    checkbox.addEventListener('click', (evt) => { 
        console.log('item: ', item)
        if (item.completed === false) {
            updateData(Actions.COMPLETE, state, {item: item})
        }
        else {
            updateData(Actions.UNCOMPLETE, state, {item: item})
        }
    })
    
    return li
}