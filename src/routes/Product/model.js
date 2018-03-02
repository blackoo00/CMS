import {Fetch} from '../../models/index'
import {message} from 'antd'
const model = new Fetch()

export default{
    getDetail: (id) => {
        const options = {
            url:'prod/detail/' + id,
        };
        return new Promise(resolve => {
            model.ajaxData(options).then(res => {
                resolve(res);
            })
        })
    },
    updateData:(data) => {
        let update_data = data;
        const options = {
            url:'prod/update?uid='+localStorage.getItem('uid'),
            data:update_data,
            type:'post'
        };
        model.ajaxData(options).then(res => {
            if(res.code == 201){
                message.success('保存成功');
            }
            console.log(res);
        })
    },
    getCats:() => {
        const options = {
            url:'cats/all'
        }
        return new Promise(resolve => {
            model.ajaxData(options).then(res => {
                resolve(res);
            })
        })
    }
}
