
import {ul, input} from '../elements'
import { renderItem } from './renderItem';


export function renderList(state){
    const items = state.todos
    
    //const ul = document.getElementById('item-list')

    //prepare for render - side effects
    ul.innerHTML = ''
    input.value = ''

    console.log('items:', items)

    items.forEach((item) => {
        if (item.added === false || true) {
            const li = renderItem(item, state)

            // append li to ul
            ul.appendChild(li)
            item.added = true
        }
    })
}