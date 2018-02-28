import controllers from '../controller/';
// ------------------------------------
// Constants
// ------------------------------------
export const ORDER_DETAIL_INIT = 'ORDER_DETAIL_INIT'

// ------------------------------------
// Actions
// ------------------------------------
export function init (id) {
    return (dispatch, getState) => {
        controllers.init(id).then(res => {
            dispatch({
                type    : ORDER_DETAIL_INIT,
                data : res,
            })
        })
    }
}

export const actions = {
    init,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ORDER_DETAIL_INIT]: (state, action) => {return {...state, ...action.data}},
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
