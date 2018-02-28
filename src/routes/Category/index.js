import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path:'category',
    getComponent(nextState,cb){
        require.ensure([],(require) => {
            const Container = require('./containers/').default
            const reducer = require('./modules/').default
            injectReducer(store, {key:'category',reducer})
            cb(null,Container)
        },'category')
    }
})
