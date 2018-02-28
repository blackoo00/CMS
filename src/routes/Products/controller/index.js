import model from '../model/'

export default {
    getList:(page,key,cid) => {
        return new Promise(resolve => {
            model.getList(page,key,cid).then(res => {
                resolve(res);
            })
        })
    }
}
