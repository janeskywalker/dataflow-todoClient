export const GET_METHOD = 'GET'
export const POST_METHOD = 'POST'



export function ajax(options) {
    let count = 0
    let startTime = Date.now() 

    const defaultPolicy = {
        maxRetries: 3,
        waitTime: 3000, 
        timeout: 10000,
    }

    const retryPolicy = options.retryPolicy || defaultPolicy

    const defaultMethod = 'GET'
    const method = options.method || defaultMethod
    
    function _ajax() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest ()
            xhr.open(method, options.url, true)
            xhr.onload = function() {
                if (xhr.status === 200) {
                    console.log('success responseText', xhr.responseText)
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    console.log('error responseText:', xhr.responseText)
                    console.log('retryPolicy: ', options.retryPolicy)

                    console.log('options.retryPolicy:', options.retryPolicy)
                    count += 1
                    // console.log('count: ', count)
                    // console.log('max: ', options.retryPolicy.maxRetries)
                    if( 
                        count <= retryPolicy.maxRetries ||
                        retryPolicy.forever === true
                    ) {
                        if (
                            Date.now() - startTime < retryPolicy.timeout || 
                            retryPolicy.forever === true
                        ) {
                            console.log('retry')
                            setTimeout(() => {
                                resolve(_ajax())
                            }, retryPolicy.waitTime)
                            
                        } else {
                            reject(new Error('Timeout'))
                        }
                    } else {
                        console.log('Max retries exceeded')
                        reject(new Error('Max retries exceeded'))
                    }
                }
            }
            xhr.setRequestHeader('Content-Type','application/json; charset=utf-8')
            
            //console.log('options.data',options.data)
            if(options.data !== null) {
                //console.log('send: 1 with data')
                xhr.send(JSON.stringify(options.data))
            } else{
                //console.log('send: 2 no data')
                xhr.send()
            }
        })   
    }
    return _ajax()
}