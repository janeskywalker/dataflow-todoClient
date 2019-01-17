
import {Selectors} from './const'


export function getElements(rootSelector) {

    const root = document.querySelector(rootSelector)

    const ul = root.querySelector(Selectors.ITEM_LIST)

    const input = root.querySelector(Selectors.INPUT)

    const buttonCompleted = root.querySelector(Selectors.BUTTON_COMPLETED)

    const buttonShowAll = root.querySelector(Selectors.BUTTON_SHOW_ALL)

    const buttonShowActive = root.querySelector(Selectors.BUTTON_SHOW_ACTIVE)

    const buttonClearComplete = root.querySelector(Selectors.BUTTON_CLEAR_COMPLETE)

    const saveError = root.querySelector(Selectors.SAVE_ERROR)

    const deleteError = root.querySelector(Selectors.DELETE_ERROR)

    const countItemLeft = root.querySelector(Selectors.COUNT_ITEM_LEFT)

    const clearCompletedError = root.querySelector(Selectors.CLEAR_COMPLETED_ERROR)

    const completeError = root.querySelector(Selectors.COMPLETE_ERROR)

    const uncompleteError = root.querySelector(Selectors.UNCOMPLETE_ERROR)

    return {
        ul, 
        input,
        buttonCompleted,
        buttonShowAll,
        buttonShowActive,
        buttonClearComplete,
        saveError,
        deleteError,
        countItemLeft, 
        clearCompletedError,
        completeError,
        uncompleteError
    }

}

