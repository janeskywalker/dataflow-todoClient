import {saveTodo} from './saveTodo'

export function addTodo(data, state, render) {

    const newTodo = {
        id: null,
        name: data.item, 
        completed: false
    }

    // add to the state locally
    state.todos.push(newTodo)
    console.log('state.todos:', state.todos)

    // save it to the server 
    // call post
    saveTodo(newTodo, state).then((state) => {
        render(state)
    })
}

// Having function rely only on their arguments makes them easier to test:

// state.todos = []

// addTodo({}, state, (newState) => {
//     assert(newState.todos.length, 1)
// })

