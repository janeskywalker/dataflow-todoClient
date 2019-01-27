import { ul, input } from '../elements'
import { renderItem } from './renderItem'

import {ul, input} from '../elements'
import { renderItem } from './renderItem';


export function renderList(state, messages){

    const items = state.todos

    //const ul = document.getElementById('item-list')

    //prepare for render - side effects
    state.elements.ul.innerHTML = ''
    state.elements.input.value = ''

    console.log('items:', items)

    items.forEach(item => {
        if (item.added === false || (true && item.isDeleted === false)) {
            console.log('item: ', item)
            const li = renderItem(item, state, messages)

            console.log('li: ', li)

            console.log('els: ', state.elements)

            // append li to ul
            state.elements.ul.appendChild(li)
            item.added = true
        }
    })
}
