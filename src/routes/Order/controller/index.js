import model from '../model/'

export default {
    init:(id) => {
        return new Promise(resolve => {
            model.init(id).then(res => {
                resolve(res);
            })
        })
    }
}
