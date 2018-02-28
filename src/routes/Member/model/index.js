import {Fetch} from '../../../models'
const model = new Fetch();

export default {
    getList:(page = 1,key = '') => {
        return new Promise(resolve => {
            const options = {
                url:'user/list',
                data:{page:page,key:key}
            }
            model.ajaxData(options).then(res => {
                resolve(res);
            })
        })
    }
}
