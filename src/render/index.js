import { renderList } from './renderList'
import { renderItemLeft } from './renderItemLeft'
import { renderError } from './renderError'

import { renderUlClass } from './renderUlClass'

export function render(state, messages) {
    renderUlClass(state)

    renderList(state, messages)

    renderItemLeft(state)

    renderError(state)
    //renderError(state.error)
}
