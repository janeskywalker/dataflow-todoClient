// This kind of data structure is called an 'enum'.
export const Actions = {
    ADD_TODO: 0,
    RETRY_SAVE: 1,
    DELETE: 2,
    COMPLETE: 3,
    UNCOMPLETE: 4,
    CLEAR_COMPLETE: 5,
}

export const Errors = {
    SAVE: 'saveError',
    DELETE: 'deleteError', 
    COMPLETE: 'completeError', 
    UNCOMPLETE: 'uncompleteError',
    CLEAR_COMPLETE: 'clearComleteError'
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





