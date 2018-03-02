import types from '../constants/ActionTypes';

const initialState = {
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

const App = (state = initialState, action) => {
    switch (action.type) {
        //初始化
        case types.PDETAIL_INIT:
            return {
                ...state,
                ...action.data
            };
        //卸载
        case types.PDETAIL_UNMOUNT:
            return [];
        case types.PDETAIL_ADD_INIT:
            return {
                ...state,
                ...action.data
            };
        case types.PDETAIL_CATEGORY:
            return {
                ...state,
                ...{categories:action.data}
            }
        default:
            return state
    }
}

export default App
