export const initialLoading = {
    local(state, data) {
        console.log('data:', data)

        var localStartingId = 0

        function newLocalId() {
            return (localStartingId += 1)
        }

        data.forEach(todo => {
            console.log('todo:', todo)
            todo.localId = newLocalId()
        })

        console.log('data:', data)

        // state.todos = data

        // state.currentId = state.todos.length + 2

        console.log('state.currentId:', state.currentId)

        const newState = Object.assign({}, state, {
            todos: data,
            currentId: data.length + 2,
        })

        console.log('newState.currentId:', newState.currentId)
        console.log('newState:', newState)

        return newState
    },
}
