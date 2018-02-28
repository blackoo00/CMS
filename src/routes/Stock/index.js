import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path:'stock',
    getComponent(nextState,cb){
        require.ensure([],(require) => {
            const Container = require('./containers/').default
            const reducer = require('./modules/').default
            injectReducer(store, {key:'stock',reducer})
            cb(null,Container)
        },'stock')
    }
})
