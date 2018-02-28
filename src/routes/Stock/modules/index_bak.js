import controllers from '../controller/'
// ------------------------------------
// Constants
// ------------------------------------
export const STOCK_INIT = 'STOCK_INIT'
export const STOCK_SEARCH = 'STOCK_SEARCH'

// ------------------------------------
// Actions
// ------------------------------------
export function searchData (page, searchText = []) {
    return (dispatch, getState) => {
        const state_searchText = getState().stock.searchText
        searchText = Object.assign(state_searchText, searchText)
        _getList(page,dispatch,searchText).then()
        {
            dispatch({
                type: STOCK_SEARCH,
                searchText: searchText,
            })
        }
    }
}

export function initData (page = 1) {
    const searchText = {
        prodSearchText: '',
        buyerSearchText: '',
        operatorSearchText: '',
        dateStart: '',
        dateEnd: '',
        status: ['1', '2,3,4']
    };
    return (dispatch) => {
        _getList(page,dispatch,searchText).then()
        {
            dispatch({
                type: STOCK_SEARCH,
                searchText: searchText,
            })
        }
    }
}

export function getData (page) {
    return (dispatch) => {
        _getList(page, dispatch)
    }
}

function _getList (page, dispatch, searchText = []) {
    return new Promise(resolve => {
        controllers.getList(page, searchText).then(res => {
            dispatch({
                type: STOCK_INIT,
                data: res,
            })
            resolve()
        })
    })
}

// export function getData (page,searchText = []) {
//     return (dispatch, getState) => {
//         const state_searchText = getState().stock.searchText;
//         if(searchText.length != 0){
//             searchText = Object.assign(state_searchText,searchText);
//         }
//         controllers.getList(page,searchText).then(res => {
//             return new Promise(resolve => {
//                 dispatch({
//                     type : STOCK_INIT,
//                     data : res,
//                 });
//                 resolve();
//             }).then(() => {
//                 if(searchText.length != 0){
//                     dispatch({
//                         type:STOCK_SEARCH,
//                         searchText:searchText,
//                     })
//                 }
//             })
//         })
//     }
// }

export const actions = {
    getData,
    searchData,
    initData
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
            init:1,
        }
    },
    [STOCK_SEARCH]: (state, action) => {
        return {
            ...state,
            searchText: action.searchText,
            init:0
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
    init:0,
    options:[
        { label: '售卖', value: '1' },
        { label: '后台操作', value: '2,3,4' },
    ],
    searchText: {
        prodSearchText: '',
        buyerSearchText: '',
        operatorSearchText: '',
        dateStart: '',
        dateEnd: '',
        status: ['1','2,3,4']
    }
}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
