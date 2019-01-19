import { renderList } from './renderList'
import { renderItemLeft } from './renderItemLeft'
import { renderError } from './renderError'

import { renderUlClass } from './renderUlClass'

export function render(state) {
    renderUlClass(state)

    renderList(state)

    renderItemLeft(state)
    //renderItemLeft(state.todos, state)

    renderError(state)
    //renderError(state.error)
}
