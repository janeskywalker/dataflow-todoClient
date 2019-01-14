
import {Selectors} from './const'


export function getElements(rootSelector) {

    const root = document.querySelector(rootSelector)

    export const ul = root.querySelector(Selectors.ITEM_LIST)

    export const input = root.querySelector(Selectors.INPUT)

    export const buttonCompleted = root.querySelector(Selectors.BUTTON_COMPLETED)

    export const buttonShowAll = root.querySelector(Selectors.BUTTON_SHOW_ALL)

    export const buttonShowActive = root.querySelector(Selectors.BUTTON_SHOW_ACTIVE)

    export const buttonClearComplete = root.querySelector(Selectors.BUTTON_CLEAR_COMPLETE)

    export const saveError = root.querySelector(Selectors.SAVE_ERROR)

    export const deleteError = root.querySelector(Selectors.DELETE_ERROR)

    export const countItemLeft = root.querySelector(Selectors.COUNT_ITEM_LEFT)

    return {
        ul, 
        input,
        buttonCompleted,
        buttonShowAll,
        buttonShowActive,
        buttonClearComplete,
        saveError,
        deleteError,
        countItemLeft
    }

}