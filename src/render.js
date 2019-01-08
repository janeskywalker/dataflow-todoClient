
import {DEFAULT_ERROR, state, ul, input, buttonCompleted, buttonShowAll, buttonShowActive, 
    buttonClearComplete, saveError, deleteError} from './const'

import {updateData} from './updateData'




export function render(data) {
    renderList(data.todos)
    renderItemLeft(data.todos)
    renderError(data.error)
}

export function renderError(error) {
    console.log('state.error: ', error)
    switch (error.type) {
        case 'saveError':
            console.log(error.type)
            saveError.classList.add('active')
            break;
        case 'deleteError':
            deleteError.classList.add('active')
            break;
        default:
            saveError.classList.remove('active')
            deleteError.classList.remove('active')
            break;
    }
}


export function renderList(items){
    
    //const ul = document.getElementById('item-list')
    ul.innerHTML = ""

    console.log('items:', items)

    items.forEach((item, i) => {

    
        if (item.added === false || true) {
            const li = document.createElement('li')
            li.innerHTML = item.name
            ul.appendChild(li)
            input.value = ''
            item.added = true
            
            const button = document.createElement('button')
            button.innerHTML = "x"
            li.appendChild(button)
            button.addEventListener('click', (evt) => {
                updateData('delete', state, {item: item})
            })

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            // checkbox.setAttribute('type', 'checkbox')
            li.prepend(checkbox)
            checkbox.checked = item.completed

            if (item.completed) {
                li.classList.add('checked')
            }
            
            checkbox.addEventListener('click', (evt) => { 
                console.log('item: ', item)
                if (item.completed === false) {
                    updateData('complete', state, {item: item})
                }
                else {
                    updateData('uncomplete', state, {item: item})
                }
            })
        }
    })
}

export function renderItemLeft(items){
    const itemLeft = items.filter((item) => {
        return item.completed === false
    })

    const countItemLeft = document.getElementById('item-left')
    countItemLeft.innerHTML = itemLeft.length
}

