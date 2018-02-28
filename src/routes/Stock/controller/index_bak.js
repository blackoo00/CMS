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
    getList:(page,search_arr = []) => {
        return new Promise(resolve => {
            model.getList(page,_buildSearchData(search_arr)).then(res => {
                resolve(res);
            })
        })
    }
}
