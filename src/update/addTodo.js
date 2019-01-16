import {saveTodo} from './saveTodo'

// export function addTodo(data, state, render) {

//     const newTodo = {
//         id: null,
//         name: data.item, 
//         completed: false,
//         isDeleted: false,
//     }

//     // add to the state locally
//     //state.todos.push(newTodo)
//     console.log('state.todos:', state.todos)

//     // save it to the server 
//     // call post
//     saveTodo(newTodo, state).then((state) => {
//         render(state)
//     })
// }



export const addTodo = {

    // add to the state locally
    local(newTodo, state, render) {

        // const newTodo = {
        //     id: null,
        //     name: data.item, 
        //     completed: false,
        //     isDeleted: false,
        // }

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

        // making this again???????
        // const newTodo = {
        //     id: null,
        //     name: data.item, 
        //     completed: false,
        //     isDeleted: false,
        // }

        saveTodo(newTodo, state).then((state) => {
            render(state)
        })
    }
}










// Having function rely only on their arguments makes them easier to test:

// state.todos = []

// addTodo({}, state, (newState) => {
//     assert(newState.todos.length, 1)
// })

