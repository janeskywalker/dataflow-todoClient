
import {getElements} from './elements'


export function app(configObj) {
    const state = {
        url: configObj.url,
        rootSelector: configObj.rootSelector,
        retryPolicy: configObj.retryPolicy
    }

    const elements = getElements(configObj.rootSelector)

}



app({
    url: 'http://localhost:4000',
    rootSelector: '#root',
    retryPolicy:
})