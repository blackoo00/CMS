import {Fetch} from '../../../models'
const model = new Fetch();

export default {
    getList:(page = 1,key = '',cid) => {
        const options = {
            url:'prod/list',
            data:{page:page,key:key,cid:cid}
        };
        return new Promise(resolve => {
            model.ajaxData(options).then(res => {
                resolve(res);
            })
        })
    }
}
