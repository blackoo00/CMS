import React, {Component} from 'react'
import SectionMain from '../components/'
import {connect} from 'react-redux'
import { Init } from '../modules/'

class App extends Component {
    constructor() {
        super()
    }

    componentWillMount(){
        const cid = this.props.params.cid;
        let {init,list} = this.props;
        if(list.length == 0){
            init(1,'',cid);
        }
    }

    componentWillReceiveProps(nextProps){
        const old_cid = this.props.params.cid;
        const next_cid = nextProps.params.cid;
        if(old_cid != next_cid){
            let {init} = this.props;
            init(1,'',next_cid);
        }
    }

    render() {
        const {list,init,total,pageSize,currentPage} = this.props
        return (
            <div>
                {list.length != 0 ?
                    <SectionMain
                        list={list}
                        total={total}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        init={(page = 1,key = '') => {init(page,key)}}/> : ''}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list:state.products.list,
    total:state.products.total,
    pageSize:state.products.pageSize,
    currentPage:state.products.currentPage
})

const mapDispatchToProps = {
    init:(page,key,cid) => Init(page,key,cid)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
