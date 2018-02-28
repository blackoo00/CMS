import {Fetch} from '../../../models'
const model = new Fetch();

export default {
    getList:(page = 1, key = '') => {
        const options = {
            url:'order/list',
            data:{page:page,key:key}
        };
        return new Promise(resolve => {
            model.ajaxData(options).then(res => {
                resolve(res);
            })
        })
    }
}
