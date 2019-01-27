import {updateData} from '../update' 
import {Actions} from '../const'
import { render } from '.';


export function renderItem(item, state) {
    debugger
    console.log('item:', item)
    const li = document.createElement('li')
    li.innerHTML = item.name

    const button = document.createElement('button')
    button.innerHTML = 'x'
    li.appendChild(button)
    button.addEventListener('click', (evt) => {
        state = updateData(Actions.DELETE, state, {item: item})
        render(state)
    })

    const checkbox = document.createElement('input')
    // or checkbox.setAttribute('type', 'checkbox')
    checkbox.type = 'checkbox'
    li.prepend(checkbox)
    checkbox.checked = item.completed

    if (item.completed) {
        li.classList.add('checked')
    }

    checkbox.addEventListener('click', evt => {
        console.log('item: ', item)
        if (item.completed === false) {
            state = updateData(Actions.COMPLETE, state, {item: item})
            render(state)
        }
        else {
            state = updateData(Actions.UNCOMPLETE, state, {item: item})
            render(state)
        }
    })

    return li
}
