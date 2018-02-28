import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path:'member',
    getComponent(nextState,cb){
        require.ensure([],(require) => {
            const Container = require('./containers/').default
            const reducer = require('./modules/').default
            injectReducer(store, {key:'member',reducer})
            cb(null,Container)
        },'member')
    }
})
