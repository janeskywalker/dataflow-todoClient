// This kind of data structure is called an 'enum'.
export const Actions = {
    ADD_TODO: 0,
    RETRY_SAVE: 1,
    DELETE: 2,
    COMPLETE: 3,
    UNCOMPLETE: 4,
    CLEAR_COMPLETE: 5,
}

export const Views = {
    SHOW_ALL: 0,
    SHOW_COMPLETED: 1,
    SHOW_ACTIVE: 2,
}

export const Errors = {
    SAVE: 'saveError',
    DELETE: 'deleteError', 
    COMPLETE: 'completeError', 
    UNCOMPLETE: 'uncompleteError',
    CLEAR_COMPLETED: 'clearCompleteError'
}

export const Selectors = {
    ITEM_LIST: '#item-list',
    INPUT: '#item-input', 
    BUTTON_COMPLETED: '#button-completed', 
    BUTTON_SHOW_ALL: '#button-show-all', 
    BUTTON_SHOW_ACTIVE: '#button-show-active',
    BUTTON_CLEAR_COMPLETE: '#button-clear-completed',
    SAVE_ERROR: '#save-error',
    DELETE_ERROR: '#delete-error',
    COUNT_ITEM_LEFT: '#item-left',
    CONFIRM_BUTTON: '.confirm-btn',
    CLEAR_COMPLETED_ERROR: '#clear-completed-error',
    COMPLETE_ERROR: '#complete-error',
    UNCOMPLETE_ERROR: '#uncomplete-error',
}

export const ACTIVE_CLASS = 'active'

export const COMPLETED_CLASS = 'completed'


// Object.freeze changes an object so it can't be changed
export const DEFAULT_ERROR = Object.freeze({
    type: 'None',
    data: null,
})

// You don't export or import data only to mutate (change) it.
// export const state = {
//     error: DEFAULT_ERROR,
//     todos: [],
//     retryCount: 0,
// }





