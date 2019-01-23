//import {ul} from './elements'
import { ACTIVE_CLASS, COMPLETED_CLASS, Views } from '../const'

export function toogleViewState(state) {
    switch (state.viewState) {
        case Views.SHOW_ACTIVE: {
            const ul = state.elements.ul
            if (ul.classList.contains(COMPLETED_CLASS)) {
                ul.classList.remove(COMPLETED_CLASS)
            }
            ul.classList.add(ACTIVE_CLASS)
            break
        }
        case Views.SHOW_ALL: {
            const ul = state.elements.ul
            ul.classList.remove(COMPLETED_CLASS)
            ul.classList.remove(ACTIVE_CLASS)
            break
        }
        case Views.SHOW_COMPLETED: {
            const ul = state.elements.ul
            if (ul.classList.contains(ACTIVE_CLASS)) {
                ul.classList.remove(ACTIVE_CLASS)
            }
            ul.classList.add(COMPLETED_CLASS)
            break
        }
    }
}
