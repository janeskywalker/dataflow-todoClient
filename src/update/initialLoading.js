export const initialLoading = {
    local(state, todos) {
        //console.log('todos:', todos)
        //debugger
        let startLocalId = state.currentId
        console.log('startLocalId: ', startLocalId)

        function newLocalId() {
            return (startLocalId += 1)
        }

        // todos.forEach(todo => {
        //     console.log('todo:', todo)
        //     todo.localId = newLocalId()
        // })

        const newTodos = todos.map(todo => {
            const newTodo = Object.assign({}, todo, { localId: newLocalId() })
            return newTodo
        })

        console.log('newTodos:', newTodos)

        const newState = Object.assign({}, state, {
            todos: newTodos,
            currentId: startLocalId + 1,
        })

        //console.log('newState.currentId:', newState.currentId)
        console.log('newState:', newState)

        return newState
    },
}
