


// We create an empty error so we can reuse the same object multiple times.
export const DEFAULT_ERROR = {
    type: 'None',
    data: null,
}

export const state = {
    error: DEFAULT_ERROR,
    todos: [],
    retryCount: 0,
}



export const ul = document.getElementById('item-list')

export const input = document.getElementById('item-input')

export const buttonCompleted = document.getElementById('button-completed')

export const buttonShowAll = document.getElementById('button-show-all')

export const buttonShowActive = document.getElementById('button-show-active')

export const buttonClearComplete = document.getElementById('button-clear-completed')

export const saveError = document.getElementById('save-error')

export const deleteError = document.getElementById('delete-error')
