import * as controllers from '../controller/';
// ------------------------------------
// Constants
// ------------------------------------
export const HOME_INIT = 'HOME_INIT'

// ------------------------------------
// Actions
// ------------------------------------

export function Init () {
    return (dispatch, getState) => {
        controllers.InitController().then(res => {
            dispatch({
                type    : HOME_INIT,
                data : res
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
    [HOME_INIT]    : (state, action) => {return {
        ...state,
        ...action.data
    }}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
