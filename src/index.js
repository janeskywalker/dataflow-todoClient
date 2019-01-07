import * as Ajax from './ajax'

const ajax = Ajax.ajax

// We create an empty error so we can reuse the same object multiple times.
const DEFAULT_ERROR = {
    type: 'None',
    data: null,
}

const state = {
    error: DEFAULT_ERROR,
    todos: [],
    retryCount: 0,
}





// data flow:
// model -> render -> event -> update model-> render 
// -> event -> update model -> render

function saveTodo(newTodo, state) {
    const promiseAdd = ajax({
        url: 'http://localhost:4000/api/todos',
        method: Ajax.POST_METHOD,
        data: newTodo,

        retryPolicy: {
            maxRetries: 3,
            waitTime: 1000, 
            timeout: 30000
        }

        //retryPolicy: null
    })

    return promiseAdd.then((savedTodo) => {
        console.log(savedTodo)
        // update locally
        // add the id to client side state.todos

        newTodo.id = savedTodo.id

        state.error = DEFAULT_ERROR

        // render(state)
        return state 
        
    }).catch((err) => {
        console.log('error: ', err)
        state.todos.pop()

        // define the error object
        state.error = {
            type: 'saveError',
            data: newTodo
        }

        console.log(state.error.data)
        console.log('state:', state)

        // render(state)
        return state 
    })
}

function updateData(how, state, data) {
    //let retries = state.retryCount || 0

    console.log('how: ', how)
    console.log('state: ', state)

    // call post
    if (how === 'addItem') {
    
        const newTodo = {
            id: null,
            name: data.item, 
            completed: false
        }

        // add to the state locally
        state.todos.push(newTodo)
        console.log('state.todos:', state.todos)
       
        saveTodo(newTodo, state).then((state) => {
            render(state)
        })
    }


    if(how === 'retrySave') {

        const newTodo = state.error.data

        console.log('newTodo:', newTodo)

        // add to the state locally
        state.todos.push(newTodo)
        console.log('state.todos:', state.todos)

   
       // add it to the server side state.todos
       saveTodo(newTodo, state).then((state) => {
            render(state)
        })
    }



    else if (how === 'delete') {
        // call delete
        const index = state.todos.indexOf(data.item) 
        //console.log('index:', index)

        const id = data.item.id
        console.log('id:', id)

        //delete it locally, data on the server stay on the server 
        // state.todos.splice(state.todos.indexOf(data.item),1)
        // filter is better than splice 
        state.todos = state.todos.filter((next) => next !== data.item)
        
        // delete it on the server side state.todos
        const promiseDelete = ajax({
            url: `http://localhost:4000/api/todos/${id}`,
            method: 'DELETE', 
            data: null, 
            //forever: true
        })

        // if delete error, auto retry (interal retry)
        // display err message to user to retry, retry button not needed
        // update data to retry (external retry)
        // add delete error widget 

        promiseDelete.then((todos) => {
            console.log(todos)
            
            state.error = DEFAULT_ERROR
            state.retryCount = 0

            render(state)

        }).catch((err) => {
            console.log(err)
            state.error = {
                type: 'deleteError',
                data: null
            }

            render(state)

            state.retryCount += 1
            console.log('state.retryCount:', state.retryCount)

            setTimeout(() => {
                updateData('delete', state, data)
            }, 3000 * state.retryCount)
        })
    }



















    else if (how === 'complete') {
        data.item.completed = true
        // call put
        const id = data.item.id

        const promiseComplete = ajax({
            url: `http://localhost:4000/api/todos/${id}/complete`,
            method: 'PUT', 
            data: null, 
        })

        promiseComplete.then((todos) => {
            console.log(todos)
        }).catch((err) => {
            console.log('error')
        })


    }

    else if (how === 'uncomplete') {
        data.item.completed = false
        var id = data.item.id
        // call put    
         var promiseUncomplete = ajax({
            url: `http://localhost:4000/api/todos/${id}/uncomplete`,
            method: 'PUT', 
            data: null, 
        })

        promiseUncomplete.then((todos) => {
            console.log(todos)
        }).catch((err) => {
            console.log('error')
        })
    }

    else if (how === 'clearCompleted'){

        const completedTodos = state.todos.filter((next) =>{
            return next.completed === true  
        })

        console.log('completedTodos', completedTodos)
        const idArr = {
            arr: []
        }

        completedTodos.forEach((next) => idArr.arr.push(next.id))

        //console.log('idArr.arr', idArr.arr)

        // call post to send data, not delete

        const promiseClearComplete = ajax({
            url: 'http://localhost:4000/api/todos/clearcompleted',
            method: 'POST',
            data: idArr,
        })

        promiseClearComplete.then((todos) => {
            console.log(todos)
        }).catch((err) => {
            console.log('error')
            //renderError()
        })

        // update locally using filter
        state.todos = state.todos.filter((next) =>{
            return next.completed === false  
        })
    }

    console.log('state.todos:', state.todos)
    render(state) 
}



//View


const ul = document.getElementById('item-list')

// update to take the whole state so you can render error
function render(data) {
    renderList(data.todos)
    renderItemLeft(data.todos)
    renderError(data.error)
}

function renderError(error) {
    console.log('state.error: ', error)
    switch (error.type) {
        case 'saveError':
            console.log(error.type)
            saveError.classList.add('active')
            break;
        case 'deleteError':
            deleteError.classList.add('active')
            break;
        default:
            saveError.classList.remove('active')
            deleteError.classList.remove('active')
            break;
    }
}


function renderList(items){
    
    const ul = document.getElementById('item-list')
    ul.innerHTML = ""

    console.log('items:', items)

    items.forEach((item, i) => {

    
        if (item.added === false || true) {
            const li = document.createElement('li')
            li.innerHTML = item.name
            ul.appendChild(li)
            input.value = ''
            item.added = true
            
            const button = document.createElement('button')
            button.innerHTML = "x"
            li.appendChild(button)
            button.addEventListener('click', (evt) => {
                updateData('delete', state, {item: item})
            })

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            // checkbox.setAttribute('type', 'checkbox')
            li.prepend(checkbox)
            checkbox.checked = item.completed

            if (item.completed) {
                li.classList.add('checked')
            }
            
            checkbox.addEventListener('click', (evt) => { 
                console.log('item: ', item)
                if (item.completed === false) {
                    updateData('complete', state, {item: item})
                }
                else {
                    updateData('uncomplete', state, {item: item})
                }
            })
        }
    })
}

function renderItemLeft(items){
    const itemLeft = items.filter((item) => {
        return item.completed === false
    })

    const countItemLeft = document.getElementById('item-left')
    countItemLeft.innerHTML = itemLeft.length
}

function showCompletedItem(){
    if(ul.classList.contains('active')){
        ul.classList.remove('active')
    }
    ul.classList.add('completed')
}

function showActiveItem(){
    if (ul.classList.contains('completed')){
        ul.classList.remove('completed')
    }
    ul.classList.add('active')
}

function showAllItem(){
    ul.classList.remove('completed')
    ul.classList.remove('active')
}



//Event
const input = document.getElementById('item-input')
input.addEventListener('keypress',(evt) => {
    if (evt.key == 'Enter') {
        const newItem = evt.target.value
        // if (newItem !== '')
        updateData('addItem', state, {item: newItem})
    }
})

const buttonCompleted = document.getElementById('button-completed')
buttonCompleted.addEventListener('click',showCompletedItem)

const buttonShowAll = document.getElementById('button-show-all')
buttonShowAll.addEventListener('click',showAllItem)

const buttonShowActive = document.getElementById('button-show-active')
buttonShowActive.addEventListener('click',showActiveItem)

const buttonClearComplete = document.getElementById('button-clear-completed')
buttonClearComplete.addEventListener('click',(evt) => {
    updateData('clearCompleted', state)
})





const saveError = document.getElementById('save-error')
saveError.querySelector('.confirm-btn').addEventListener('click', (evt) => {
    console.log('newthing:', state.error.data)
    updateData('retrySave', state)
})

const deleteError = document.getElementById('delete-error')




// call GET 
var promiseGet = ajax({
    url: 'http://localhost:4000/api/todos',
    method: Ajax.GET_METHOD,
    data: null
})

promiseGet.then((todos) => {
    console.log(todos)
    state.todos = todos
    render(state)
}).catch((err) => {
    console.log('error: ', err)
})

