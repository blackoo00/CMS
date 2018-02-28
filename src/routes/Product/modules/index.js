import types from '../constants/ActionTypes';

const initialState = []

const App = (state = initialState, action) => {
    switch (action.type) {
        //初始化
        case types.PDETAIL_INIT:
            return {
                ...state,
                ...action.data
            };
        //卸载
        case types.PDETAIL_UNMOUNT:
            return [];
        default:
            return state
    }
}

export default App
