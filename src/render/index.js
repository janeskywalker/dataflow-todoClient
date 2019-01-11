import { renderList } from './renderList'
import { renderItemLeft } from './renderItemLeft'
import { renderError } from './renderError'

export function render(state) {
    renderList(state)
    renderItemLeft(state.todos)
    renderError(state.error)
}
