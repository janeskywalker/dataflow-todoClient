import { renderList } from './renderList'
import { renderItemLeft } from './renderItemLeft'
import { renderError } from './renderError'
import { toogleViewState } from './toogleViewState'

export function render(state) {
    toogleViewState(state)

    renderList(state)

    renderItemLeft(state)
    //renderItemLeft(state.todos, state)

    renderError(state)
    //renderError(state.error)
}
