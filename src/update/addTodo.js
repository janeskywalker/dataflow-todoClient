import { saveTodo } from './saveTodo'

export const addTodo = {
    // add to the state locally
    local(newTodo, state, render) {

        console.log('oldState: ', state)

        // create a new array that has all old todos and the new Todo
        // spread operator
        const newTodos = [ ...state.todos, newTodo ]

        // or do this to copy/merge an object
        const newState = Object.assign({}, state, {
            todos: newTodos
        })
        console.log('oldState: ', state)
        console.log('newState: ', newState)
        
        // state.todos.push(newTodo)
        console.log('state.todos:', state.todos)

        // shall not render here?????
        render(state)
    },

    // save it to the server
    // call post
    remote(newTodo, state, render) {

        saveTodo(newTodo, state).then((state) => {
            render(state)
        })
    },
}

// Having function rely only on their arguments makes them easier to test:

// state.todos = []

// addTodo({}, state, (newState) => {
//     assert(newState.todos.length, 1)
// })
