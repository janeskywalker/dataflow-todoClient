import {saveError, deleteError} from '../elements'

import {Errors, ACTIVE_CLASS} from '../const'

// Move all class names into const.js
// Move all error types into const.js
// to make your code much easier to read and maintain (change)
export function renderError(error) {
    console.log('state.error: ', error)
    switch (error.type) {
        case Errors.SAVE:
            console.log(error.type)
            saveError.classList.add(ACTIVE_CLASS)
            break;
        case Errors.DELETE:
            deleteError.classList.add(ACTIVE_CLASS)
            break;
        default:
            saveError.classList.remove(ACTIVE_CLASS)
            deleteError.classList.remove(ACTIVE_CLASS)
            break;
    }
}
