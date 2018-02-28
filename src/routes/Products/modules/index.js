import controllers from '../controller/';
// ------------------------------------
// Constants
// ------------------------------------
export const PRODUCTS_INIT = 'PRODUCTS_INIT'
export const PRODUCTS_PAGE = 'PRODUCTS_PAGE'

// ------------------------------------
// Actions
// ------------------------------------

export function Init (page,key,cid) {
    return (dispatch, getState) => {
        cid = typeof cid == 'undefined' ? getState().products.cid : cid;
        controllers.getList(page,key,cid).then(res => {
            dispatch({
                type:PRODUCTS_INIT,
                data:res,
                cid:cid,
                currentPage:page
            })
        })
    }
}

export const actions = {
    Init
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [PRODUCTS_INIT]    : (state, action) => {return {
        ...state,
        list:action.data.data,
        total:action.data.total,
        pageSize:action.data.per_page,
        cid:action.cid,
        currentPage:action.currentPage
    }}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    list:[],
    total:0,
    pageSize:0,
    cid:0,
    currentPage:1
}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
