import 'whatwg-fetch'

export function get(url, payload = false, options = {}){
    if (payload){
        let queryString = '?'
        let first = true
        for (let o of payload) {
            if (!first){
                queryString += '&'
            }
            queryString += `${o}=${payload[o]}`
            first = false
        }
        url = url + queryString
    }
    options.method = 'GET'
    return rawfetch(url, options)
}

export function post(url, options){
    let mergeOptions = {...options, method: 'POST'}
    return rawfetch(url, mergeOptions)
}

export function put(url, options){
    let mergeOptions = {...options, method: 'PUT'}
    return rawfetch(url, mergeOptions)
}

export function del(url, options){
    let mergeOptions = {...options, method: 'DELETE'}
    return rawfetch(url, mergeOptions)
}

function rawfetch(url, options = {}){
    let headers = {'Accept': 'application/json'}
    if (!options.blob) headers['Content-Type'] = 'application/json'
    const mergedOptions = { headers: headers, ...options, body: options.blob ? options.body : JSON.stringify(options.body) }

    return fetch(url, mergedOptions)
        .then(resp => {
            if (!resp.ok){
                throw {status: resp.status, statusText: resp.statusText}
            }
            if (resp.redirected){
                window.location = resp.url
                return
            }
            return resp.json()
        })
}
