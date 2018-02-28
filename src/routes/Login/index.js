import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'login',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Counter = require('./containers/').default
            const reducer = require('./modules/counter').default

            injectReducer(store, { key: 'login', reducer })

            cb(null, Counter)

        }, 'login')
    }
})
