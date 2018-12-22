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
    return rawfetch(url, options)
}

export function post(url, options){
    let mergeOptions = {...options, method: 'POST'}
    return rawfetch(url, options)
}

function rawfetch(url, options = {}){
    const method = options.method || 'GET'
    return fetch(url, { method })
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
