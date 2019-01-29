export const updateSaveError = {
    local(state, newTodo) {
        
        const newState = Object.assign({}, state, {error: {type: 'saveError', data: newTodo}})
        
        console.log('state after updated save err:', newState)
        return newState
    }
}