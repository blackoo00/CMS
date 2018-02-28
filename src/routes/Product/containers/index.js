import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/'
import Components from '../components/'

class App extends Component {
    constructor() {
        super()
    }
    componentWillMount(){
        let id = this.props.location.query.id
        let {init,addInit,getCats} = this.props
        if(typeof id != 'undefined' && id != 0){
            init(id)
        }else{
            // addInit()
        }
        getCats();
    }
    /*
    * 卸载
    * 使用antd进行了数据绑定，当切换产品时，优先传入的是先前state的产品数据,又因为是在componentDidMount
    * 中绑定数据，所以只能进行卸载，然后再进行数据绑定
    * */
    componentWillUnmount(){
        const {unmount,addInit} = this.props;
        // unmount();
        addInit();
    }
    render(){
        const {...rest} = this.props;
        return(
            <div>
                {rest.info.length != 0 ? <Components
                    info = {rest.info}
                    createOrUpdate = {(data) => rest.createOrUpdate(data,rest.info)}
                /> : ''}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    info: state.product
})

const mapDispatchToProp = dispatch => ({
    init: (id) => {
        dispatch(actions.pdetailInit(id))
    },
    unmount:() => {
        dispatch(actions.unmount())
    },
    createOrUpdate:(data,info) => {
        dispatch(actions.createOrUpdate(data,info))
    },
    addInit: (id) => {
        dispatch(actions.addInit(id))
    },
    getCats:() => {
        dispatch(actions.getCats())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProp
)(App)
