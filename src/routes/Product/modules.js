import types from './ActionTypes'

const initialState = {
    id: '',
    name: '',
    price: '',
    start_count: '',
    stock: '',
    details: '<p>123</p>',
    sales_count: '',
    main_img_url: '',
    summary: '',
    img_id: '',
    is_on_sale: true,
    is_discount: 0,
    cat_name: '',
    properties: [],
    discount: [],
    file_loading:false,
    editorContent: undefined,
    editorState: ''
}

const App = (state = initialState, action) => {
    switch (action.type) {
        //初始化
        case types.PDETAIL_INIT:
            return {
                ...state,
                ...action.data
            }
            //字段变动
        case types.PDETAIL_FILE_CHANGE:
            return {
                ...state,
                ...action.data
            }
        //卸载
        case types.PDETAIL_UNMOUNT:
            return []
        //添加商品初始化
        case types.PDETAIL_ADD_INIT:
            return {
                ...state,
                ...action.data
            }
            //获取商品分类
        case types.PDETAIL_CATEGORY:
            return {
                ...state,
                ...{ categories: action.data }
            }
        default:
            return state
    }
}

export default App
