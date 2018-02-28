import {Fetch} from '../../../models'
const model = new Fetch();

export default {
    login:(aData) => {
        const options = {
            url:'token/app',
            type:'post',
            data:aData
        };
        return new Promise(resolve => {
            model.ajaxData(options).then(data => {
                resolve(data);
            })
        })
    }
}
