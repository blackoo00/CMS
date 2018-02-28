import controllers from '../controller/'
// ------------------------------------
// Constants
// ------------------------------------
export const STOCK_INIT = 'STOCK_INIT'
export const STOCK_SEARCH = 'STOCK_SEARCH'

// ------------------------------------
// Actions
// ------------------------------------
/*重置:初始化，刷新使用*/
export function initData () {
    const searchText = {
        prodSearchText: '',
        buyerSearchText: '',
        operatorSearchText: '',
        dateStart: '',
        dateEnd: '',
        status: ['1', '2,3,4']
    };
    return (dispatch) => {
        controllers.getList().then(res => {
            dispatch({
                type: STOCK_INIT,
                data: res,
                searchText: searchText
            })
        })
    }
}
export function searchData (searchText) {
    return (dispatch,getState) => {
        const state_searchText = getState().stock.searchText
        searchText = Object.assign(state_searchText, searchText)
        controllers.getListBySearch(searchText).then(res => {
            dispatch({
                type: STOCK_INIT,
                data: res,
                searchText: searchText
            })
        })
    }
}

export function pageData (page) {
    return (dispatch, getState) => {
        const searchText = getState().stock.searchText;
        controllers.getListBySearch(page,searchText).then(res => {
            dispatch({
                type: STOCK_INIT,
                data: res,
                searchText: searchText
            })
        })
    }
}

export function orderData (orderText) {
    return (dispatch, getState) => {
        const searchText = getState().stock.searchText;
        controllers.getListByOrder(orderText,searchText).then(res => {
            dispatch({
                type: STOCK_INIT,
                data: res,
                orderText: orderText,
                searchText: searchText
            })
        })
    }
}

export const actions = {
    pageData,
    searchData,
    initData,
    orderData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [STOCK_INIT]: (state, action) => {
        return {
            ...state,
            list: action.data.data,
            total: action.data.total,
            pageSize: action.data.per_page,
            searchText: action.searchText,
            orderText: action.orderText,
        }
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    list: [],
    total: 0,
    pageSize: 0,
    options:[
        { label: '售卖', value: '1' },
        { label: '后台操作', value: '2,3,4' },
    ],
    searchText:{
        prodSearchText: '',
        buyerSearchText: '',
        operatorSearchText: '',
        dateStart: '',
        dateEnd: '',
        status: ['1', '2,3,4']
    }
}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
