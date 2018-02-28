import model from '../model/'

/*讲搜索类型转成服务端所需类型*/
const _buildSearchData = (search_arr) => {
    if(search_arr.length != 0){
        //对status进行处理
        const status = search_arr.status;
        let status_str = '';
        if(typeof status != 'undefined' && status.length != 0){
            status.map(item => {
                status_str += item + ',';
            })
            status_str = status_str.substr(0,status_str.length - 1);
        }
        const data = {
            prod:search_arr.prodSearchText,
            buyer:search_arr.buyerSearchText,
            operator:search_arr.operatorSearchText,
            start:search_arr.dateStart,
            end:search_arr.dateEnd,
            status:status_str
        }
        return data;
    }
}

export default {
    //初始化不带条件
    getList:() => {
        return new Promise(resolve => {
            model.getList().then(res => {
                resolve(res);
            })
        })
    },
    //搜索
    getListBySearch:(searchText) => {
        const data = {
            searchs:_buildSearchData(searchText)
        }
        return new Promise(resolve => {
            model.getList(data).then(res => {
                resolve(res);
            })
        })
    },
    //分页
    getListByPage:(page,searchText = {},orderText = {}) => {
        const data = {
            page:page,
            searchs:_buildSearchData(searchText)
        }
        return new Promise(resolve => {
            model.getList(data).then(res => {
                resolve(res);
            })
        })
    },
    //排序
    getListByOrder:(orderText,searchText) => {
        const data = {
            orders:orderText,
            searchs:_buildSearchData(searchText),
        }
        return new Promise(resolve => {
            model.getList(data).then(res => {
                resolve(res);
            })
        })
    }
}
