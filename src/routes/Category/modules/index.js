import controllers from '../controller/';
// ------------------------------------
// Constants
// ------------------------------------
export const CATEGORY_INIT = 'CATEGORY_INIT'
export const CATEGORY_PAGE = 'CATEGORY_PAGE'

// ------------------------------------
// Actions
// ------------------------------------

export function Init (page,key) {
    return (dispatch, getState) => {
        controllers.getList(page,key).then(res => {
            dispatch({
                type    : CATEGORY_INIT,
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
    [CATEGORY_INIT]    : (state, action) => {return {
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
