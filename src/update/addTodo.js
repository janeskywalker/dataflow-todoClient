import { saveTodo } from './saveTodo'

export const addTodo = {
    // add to the state locally
    local(newTodo, state, render) {
        // local state.todo and remote state.todo
        // can not push in here ??????? b/c id is null, also add 2X
        // but it wont show the newTodo with the error widget
        state.todos.push(newTodo)
        console.log('state.todos:', state.todos)

        // shall not render here?????
        render(state)
    },

    // save it to the server
    // call post
    remote(newTodo, state, render) {
        saveTodo(newTodo, state).then(state => {
            render(state)
        })
    },
}

// Having function rely only on their arguments makes them easier to test:

// state.todos = []

// addTodo({}, state, (newState) => {
//     assert(newState.todos.length, 1)
// })
