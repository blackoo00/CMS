import {Fetch} from '../../../models'
const model = new Fetch();

export default {
    init:(id) => {
        const options = {
            url:'order/'+id,
        };
        return new Promise(resolve => {
            model.ajaxData(options).then(res => {
                resolve(res);
            })
        })
    }
}
