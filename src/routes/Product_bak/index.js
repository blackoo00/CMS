import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path:'product',
    getComponent(nextState,cb){
        require.ensure([],(require) => {
            const Container = require('./containers/').default
            const reducer = require('./modules/').default
            injectReducer(store, {key:'product',reducer})
            cb(null,Container)
        },'product')
    }
})
