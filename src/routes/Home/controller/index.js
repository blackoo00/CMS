import model from '../model/';

export const InitController = ()=> {
    return new Promise(resolve => {
        model.getData().then(res => {
            resolve(res);
        })
    })
}
