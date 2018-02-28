import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'home',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Counter = require('./containers/').default
      const reducer = require('./modules/').default

      injectReducer(store, { key: 'home', reducer })

      cb(null, Counter)

    }, 'home')
  }
})
