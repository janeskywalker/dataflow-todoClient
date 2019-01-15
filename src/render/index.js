import { renderList } from './renderList'
import { renderItemLeft } from './renderItemLeft'
import { renderError } from './renderError'

export function render(state) {
    renderList(state)

    renderItemLeft(state)
    //renderItemLeft(state.todos, state)

    renderError(state)
    //renderError(state.error)
}
