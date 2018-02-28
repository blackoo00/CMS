import {Fetch} from '../../../models'
const model = new Fetch();

export default {
    getList:(data = {}) => {
        console.log(data);
        const options = {
            url:'stock/list',
            data:data,
            type:'post'
        };
        return new Promise(resolve => {
            model.ajaxData(options).then(res => {
                resolve(res);
            })
        })
    }
}
