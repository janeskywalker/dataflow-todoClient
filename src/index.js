
import {app} from './app'


app({
    url: 'http://localhost:4000',
    rootSelector: '#root',
    //retryPolicy:
})



/**
 * programming that just runs statements in order is
 * called imperative programming (list of things to do)
 * 
 * ul.addEventListener('click', () => {})
 * 
 * 2 + 3
 * 
 * console.log('whateveer')
 */


/**
 * Data Flow
 * 
 * state -> render -> events -> update state -> render
 *
 * 
 * Functional Programming
 * 
 * What's a pure function?
 * A function that doesn't have side effect
 * A function that returns the same output for same input
 * 
 * Pure (stateless) programming
 * const add = (a, b) => a + b
 * add(1,2) === 3
 * 
 * Stateful programming (function relies on a state outside of the function)
 * let val = 3
 * const add = (a) => val += a
 * add(3) === 6
 * add(3) === 9
 * add(3) === 12
 * 
 * If a function doesn't return anything it is only performing side effects
 */