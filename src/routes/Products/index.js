import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path:'products/:cid',
    getComponent(nextState,cb){
        require.ensure([],(require) => {
            const Container = require('./containers/').default
            const reducer = require('./modules/').default
            injectReducer(store, {key:'products',reducer})
            cb(null,Container)
        },'products')
    }
})
