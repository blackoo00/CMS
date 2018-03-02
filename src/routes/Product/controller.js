import model from './model';
import * as actions from './actions'

export default {
    init:(id) => dispatch => {
        model.getDetail(id).then(res => {
            dispatch(actions.pdetailInit(res))
        });
    },
    getCats:() => dispatch => {
        model.getCats().then(res => {
            dispatch(actions.getCats(res))
        })
    },
    createOrUpdate : (data,info) => {
        let post_data = data;
        const extend_data = {
            id:info.id,
        };
        Object.assign(post_data,extend_data);
        //删除为空的ID属性值
        if(typeof post_data.properties != 'undefined'){
            post_data.properties.map((item,index) => {
                if(item.id == ''){
                    delete post_data.properties[index]['id']
                }
            })
        }
        if(typeof post_data.discount != 'undefined'){
            post_data.discount.map((item,index) => {
                if(item.id == ''){
                    delete post_data.discount[index]['id']
                }
            })
        }
        post_data['is_on_sale'] = post_data['is_on_sale'] ? 1 :0;
        model.updateData(post_data);
    }
}
