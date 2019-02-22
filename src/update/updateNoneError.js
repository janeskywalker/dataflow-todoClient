import { DEFAULT_ERROR } from '../const'

export const updateNoneError = {
    local(state) {
        const newState = Object.assign({}, state, {
            error: DEFAULT_ERROR,
            retryCount: 0,
        })

        console.log('state after updated none error:', newState)
        return newState
    },
}
