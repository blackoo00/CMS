// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'
import Welcome from './Welcome'
import CounterRoute from './Counter'
import TestRoute from './Test'
import Login from './Login/'
import Member from './Member/'
import Category from './Category/'
import Products from './Products/'
import Product from './Product/'
import Orders from './Orders/'
import Order from './Order/'
import Stock from './Stock/'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
    path: '/',
    component: CoreLayout,
    indexRoute: Welcome,
    childRoutes: [
        Home(store),
        CounterRoute(store),
        TestRoute(store),
        Login(store),
        Member(store),
        Category(store),
        Products(store),
        Product(store),
        Order(store),
        Stock(store),
        Orders(store)
    ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
