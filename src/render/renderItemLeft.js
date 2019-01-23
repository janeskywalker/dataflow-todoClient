import { countItemLeft } from '../elements'

export function renderItemLeft(state) {
    const itemLeft = state.todos.filter(todo => {
        return todo.completed === false
    })

    // Redoing this work every time function is called:
    // import it or put it to the top:
    // const countItemLeft = document.getElementById('item-left')

    state.elements.countItemLeft.innerHTML = itemLeft.length
}
