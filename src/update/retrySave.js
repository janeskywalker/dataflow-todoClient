
import {saveTodo} from './saveTodo'

import {render} from '../render/index'


export function retrySave(state) {

    console.log('state.todos:', state.todos)

    // dont need to add locally, done when save the 1st time 

    const newTodo = state.error.data
    //console.log('newTodo:', newTodo)

    // add it to the server side state.todos
    saveTodo(newTodo, state).then((state) => {
        render(state)
    })

}