import React, {Component} from 'react'
import SectionMain from '../components/'
import {connect} from 'react-redux'
import { Init } from '../modules/'

class App extends Component {
    constructor() {
        super()
    }

    componentWillMount(){
        let {init} = this.props;
        init();
    }

    render() {
        const {list,init,total,pageSize} = this.props
        return (
            <div>
                {list.length != 0 ? <SectionMain list={list} total={total} pageSize={pageSize} init={(page = 1,key = '') => {init(page,key)}}></SectionMain> : ''}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list:state.orders.list,
    total:state.orders.total,
    pageSize:state.orders.pageSize
})

const mapDispatchToProps = {
    init:(page,key) => Init(page,key)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
