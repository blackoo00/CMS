import config from '../config'
import {browserHistory} from 'react-router';
import {message} from 'antd'

const SERVER_URL = config.SERVER

class Fetch {
    constructor(){
        let token = localStorage.getItem('token')
        if(!token){
            message.error('token过期或无效');
            browserHistory.push('/login')
        }
    }
    ajaxData(options){
        const type = typeof options.type == 'undefined' ? 'get' : 'post';
        return new Promise(resolve => {
            if(type == 'post'){
                this.fetchPost(SERVER_URL + options.url,options.data).then(res => {
                    this._handleError(res).then(res => {
                        resolve(res);
                    });
                });
            }else {
                this.fetchGet(SERVER_URL + options.url,options.data).then(res => {
                    this._handleError(res).then(res => {
                        resolve(res);
                    });
                });
            }
        })
    }
    _handleError(res){
        return new Promise(resolve => {
            if(typeof res.error_code != 'undefined'){
                message.error(res.msg);
                if(res.error_code == 10001){
                    browserHistory.push('/login')
                }
            }else{
                resolve(res)
            }
        })
    }
    fetchGet(host,data){
        let token = localStorage.getItem('token')
        if (data) {
            host += '?';
            for (let item in data) {
                if (data.hasOwnProperty(item) && data[item]) {
                    host += (item + '=' + JSON.stringify(data[item]) + '&')
                }
            }
        }
        return fetch(host, {
            mode: 'cors',
            headers:{
                token:token,
            },
        }).then(res => {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + res.status)
            }
            // 处理响应中的文本信息
            return res.json()
        }).catch(err => {
            console.log('Fetch Error : %S', err)
        })
    }
    fetchPost (host,data) {
        let token = localStorage.getItem('token')
        let dataUrl = ''
        if (data) {
            for (let item in data) {
                if (data.hasOwnProperty(item)) {
                    if(typeof data[item] == 'object'){
                        dataUrl += ('&' + item + '=' + JSON.stringify(data[item]))
                    }else{
                        dataUrl += ('&' + item + '=' + data[item])
                    }
                }
            }
        }
        let body = 'client=1&version=3&token=' + token + dataUrl

        return fetch(host, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body
        }).then(function (res) {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + res.status)
                return
            }
            // 处理响应中的文本信息
            return res.json()
        }).catch(function (err) {
            console.log('Fetch Error : %S', err)
        })
    }
}

export { Fetch }
