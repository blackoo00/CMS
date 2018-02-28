// ------------------------------------
// Constants
// ------------------------------------
export const INPUTAC = 'INPUTAC'
export const INPUTSE = 'INPUTSE'

// ------------------------------------
// Actions
// ------------------------------------
export function handleAccount (data) {
    return {
        type: INPUTAC,
        data: data
    }
}

export function handlePassword (data) {
    return {
        type: INPUTSE,
        data: data
    }
}

export const actions = {
    handleAccount,
    handlePassword
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [INPUTAC]: (state, action) => {return {...state, ac:action.data}},
    [INPUTSE]: (state, action) => {return {...state, se:action.data}},
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    warn: '',
    ac: '',
    se: ''
}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
