import { saveTodo } from './saveTodo'

import { render } from '../render/index'

export const retrySave = {
    remote(state) {
        const newTodo = state.error.data
        saveTodo(newTodo, state).then(state => {
            console.log('state.todos after saved:', state.todos)
            render(state)
        })
    },
}
