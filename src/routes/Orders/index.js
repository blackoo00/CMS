import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path:'orders',
    getComponent(nextState,cb){
        require.ensure([],(require) => {
            const Container = require('./containers/').default
            const reducer = require('./modules/').default
            injectReducer(store, {key:'orders',reducer})
            cb(null,Container)
        },'orders')
    }
})
