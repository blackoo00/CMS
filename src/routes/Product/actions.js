import types from './ActionTypes'

export const pdetailInit = data => ({
    type:types.PDETAIL_INIT,
    data:data
});

export const unmount = () => dispatch => {
    dispatch({
        type:types.PDETAIL_UNMOUNT
    })
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

export const getCats = data => ({
    type:types.PDETAIL_CATEGORY,
    data:data
})

export const fileChange = (data) => ({
    type:types.PDETAIL_FILE_CHANGE,
    data:data
})
