
import {ul} from './elements'
import { ACTIVE_CLASS, COMPLETED_CLASS } from './const';

// update to use const for class names 
export function showCompletedItem(){
    if(ul.classList.contains(ACTIVE_CLASS)){
        ul.classList.remove(ACTIVE_CLASS)
    }
    ul.classList.add(COMPLETED_CLASS)
}

export function showActiveItem(){
    if (ul.classList.contains(COMPLETED_CLASS)){
        ul.classList.remove(COMPLETED_CLASS)
    }
    ul.classList.add(ACTIVE_CLASS)
}

export function showAllItem(){
    ul.classList.remove(COMPLETED_CLASS)
    ul.classList.remove(ACTIVE_CLASS)
}
