import controllers from '../controller/';
// ------------------------------------
// Constants
// ------------------------------------
export const ORDERS_INIT = 'ORDERS_INIT'
export const ORDERS_PAGE = 'ORDERS_PAGE'

// ------------------------------------
// Actions
// ------------------------------------

export function Init (page,key) {
    return (dispatch, getState) => {
        controllers.getList(page,key).then(res => {
            dispatch({
                type    : ORDERS_INIT,
                data : res,
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
    [ORDERS_INIT]    : (state, action) => {return {
        ...state,
        list:action.data.data,
        total:action.data.total,
        pageSize:action.data.per_page,
    }}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    list:[],
    total:0,
    pageSize:0,
}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
