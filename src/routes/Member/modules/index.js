import controllers from '../controller/';
// ------------------------------------
// Constants
// ------------------------------------
export const MEMBER_INIT = 'MEMBER_INIT'
export const MEMBER_PAGE = 'MEMBER_PAGE'

// ------------------------------------
// Actions
// ------------------------------------

export function Init (page,key) {
    return (dispatch, getState) => {
        controllers.getList(page,key).then(res => {
            dispatch({
                type : MEMBER_INIT,
                data : res,
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
    [MEMBER_INIT]    : (state, action) => {return {
        ...state,
        list:action.data.data,
        total:action.data.total,
        pageSize:action.data.per_page,
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
    currentPage:1
}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
