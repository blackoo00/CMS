import model from '../model/'
import {browserHistory} from 'react-router';
import {message} from 'antd';

export const Login = (ac, se) => dispatch => {
    model.login({ ac: ac, se: se })
        .then(data => {
            console.log(data.uid);
            if (data.token) {
                localStorage.setItem('token', data.token)
            }
            if (data.uid) {
                localStorage.setItem('uid', data.uid)
            }
            message.success('登录成功')
            localStorage.setItem('account', ac)
            browserHistory.push('/home')
        })
}
