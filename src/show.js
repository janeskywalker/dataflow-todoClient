


export function showCompletedItem(){
    if(ul.classList.contains('active')){
        ul.classList.remove('active')
    }
    ul.classList.add('completed')
}

export function showActiveItem(){
    if (ul.classList.contains('completed')){
        ul.classList.remove('completed')
    }
    ul.classList.add('active')
}

export function showAllItem(){
    ul.classList.remove('completed')
    ul.classList.remove('active')
}
