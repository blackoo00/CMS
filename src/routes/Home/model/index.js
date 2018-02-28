import {Fetch} from '../../../models'
const model = new Fetch()

export default {
    getData: () => {
      const options = {
          url:'home_data'
      };
      return new Promise(resolve => {
          model.ajaxData(options).then(res => {
              resolve(res);
          })
      })
    },
    getUsers: () => {
        const options = {
            url: 'user/static',
        };
        return new Promise(resolve => {
            model.ajaxData(options).then(res => {
                resolve(res);
            })
        })
    },
    getProds:() => {
        const options = {
            url: 'prod/static'
        };
        return new Promise(resolve => {
            model.ajaxData(options).then(res => {
                resolve(res);
            })
        })
    },
    getOrders:() => {
        const options = {
            url:'order/static',
        };
        return new Promise(resolve => {
            model.ajaxData(options).then(res => {
                resolve(res);
            })
        })
    }
}
