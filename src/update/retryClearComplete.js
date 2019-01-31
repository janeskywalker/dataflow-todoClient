import { Errors, DEFAULT_ERROR} from '../const'

import {Actions} from '../const'

export const retryClearComplete = {

    local(state) {

        //const newState = Object.assign({}, state, {retryCount: data.retryCount, error: data.error})
        const newState = Object.assign({}, state, 
            {error: {type: Errors.CLEAR_COMPLETED, data: null}, 
            retryCount: state.retryCount + 1})
        
        console.log('state after updated clear complete error:', newState)
        return newState
    },

    remote(data, state, messages) {

            console.log('messages:', messages)
            console.log('data:', data) 

            const waitTime = 3000 * (state.retryCount + 1)

            console.log(waitTime)

            //setTimeout(() => {messages(Actions.DELETE, data.error.data)}, waitTime)
            setTimeout(() => {messages(Actions.CLEAR_COMPLETE, data)}, waitTime)
    }
}