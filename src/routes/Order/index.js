import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path:'order/:id',
    getComponent(nextState,cb){
        require.ensure([],(require) => {
            const Container = require('./containers/').default
            const reducer = require('./modules/').default
            injectReducer(store, {key:'order',reducer})
            cb(null,Container)
        },'order')
    }
})
