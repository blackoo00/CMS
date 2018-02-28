import types from '../constants/ActionTypes'
import model from '../model/'

const pdetailInitDip = data => ({
    type:types.PDETAIL_INIT,
    data:data
});

export const pdetailInit = (id) => dispatch => {
    model.getDetail(id).then(res => {
        dispatch(pdetailInitDip(res))
    });
};

export const unmount = () => dispatch => {
    dispatch({
        type:types.PDETAIL_UNMOUNT
    })
}

export const createOrUpdate = (data,info) => dispatch => {
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

export const addInit = () => ({
    type:types.PDETAIL_ADD_INIT,
    data:{
        id:'',
        name:'',
        price:'',
        start_count:'',
        stock:'',
        details:'',
        sales_count:'',
        main_img_url:'',
        summary:'',
        img_id:'',
        is_on_sale:true,
        is_discount:0,
        cat_name:'',
        properties:[],
        discount:[]
    }
})

export const getCats = () => dispatch => {
    model.getCats().then(res => {
        dispatch(getCatsDip(res))
    })
}

const getCatsDip = data => ({
    type:types.PDETAIL_CATEGORY,
    data:data
})
