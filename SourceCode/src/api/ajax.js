import axios from 'axios'

// 包装的axios ajax请求接口
export default function ajax (url, data={}, method='GET') {
    return new Promise(function (resolve, reject) {
        let promise
        if (method === 'GET') {
            const queryStr = Object.keys(data)
                .map(key => data[key] && `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
                .join('&');
            promise = axios({
                url:url+'?'+queryStr,
                method:'GET'
            })
        } else if (method==='POST'){
            promise = axios({
                url: url,
                method: 'POST',
                data: data,
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        } else if(method==='PUT'){
            promise = axios({
                url: url,
                method: 'PUT',
                data: data,
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        }else if(method==='DELETE'){
            promise = axios({
                url: url,
                method: 'DELETE',
                data: data,
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        }

        promise.then(function (response) {
            resolve(response.data)
        }).catch(function (error) {
            reject(error)
        })
    })
}
