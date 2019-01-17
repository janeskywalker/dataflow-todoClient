import {saveError, deleteError} from '../elements'

import {Errors, ACTIVE_CLASS} from '../const'

// Move all class names into const.js
// Move all error types into const.js
// to make your code much easier to read and maintain (change)


export function renderError(state) {
    console.log('state.error: ', state.error)
    switch (state.error.type) {
        case Errors.SAVE:
            console.log(state.error.type)
            state.elements.saveError.classList.add(ACTIVE_CLASS)
            break;
        case Errors.DELETE:
            state.elements.deleteError.classList.add(ACTIVE_CLASS)
            break;
        case Errors.CLEAR_COMPLETED:
            state.elements.clearCompletedError.classList.add(ACTIVE_CLASS)
            break;
        case Errors.COMPLETE:
            state.elements.completeError.classList.add(ACTIVE_CLASS)
            break;
        case Errors.UNCOMPLETE:
            state.elements.uncompleteError.classList.add(ACTIVE_CLASS)
            break;
        default:
            state.elements.saveError.classList.remove(ACTIVE_CLASS)
            state.elements.deleteError.classList.remove(ACTIVE_CLASS)
            state.elements.clearCompletedError.classList.remove(ACTIVE_CLASS)
            state.elements.completeError.classList.remove(ACTIVE_CLASS)
            state.elements.uncompleteError.classList.remove(ACTIVE_CLASS)
            break;
    }
}
