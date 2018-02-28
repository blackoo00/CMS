import model from '../model/'

export default {
    getList:(page,key) => {
        return new Promise(resolve => {
            model.getList(page,key).then(res => {
                resolve(res);
            })
        })
    }
}
