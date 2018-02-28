import config from '../config'
import {browserHistory} from 'react-router';
import {message} from 'antd'
import reqwest from 'reqwest';

const SERVER_URL = config.SERVER

class Fetch {
    constructor () {
        const token = localStorage.getItem('token')
        if (!token) {
            message.error('token过期或无效');
            browserHistory.push('/login')
        }
        this.token = token;
    }
    ajaxData (options) {
        return new Promise(resolve => {
            reqwest({
                url: SERVER_URL + options.url,
                type: 'json',
                method: options.type,
                data:options.type == 'post' ? JSON.stringify(options.data) : options.data,
                contentType: 'application/json',
                headers: {
                    'token': localStorage.getItem('token')
                },
                error: function (err) {
                    const response = JSON.parse(err.response);
                    message.error(response.msg);
                    if (response.error_code == 10001) {
                        browserHistory.push('/login')
                    }
                },
                success: function (resp) {
                    if (typeof resp.error_code != 'undefined') {
                        message.error(resp.msg);
                        if (resp.error_code == 10001) {
                            browserHistory.push('/login')
                        }
                    }else{
                        resolve(resp);
                    }
                }
            })
        })
    }
}
export { Fetch }
