import React, {Component} from 'react'
import SectionMain from '../components/'
import {connect} from 'react-redux'
import { Init } from '../modules/'

class App extends Component {
    constructor() {
        super()
    }

    componentWillMount(){
        let {init,list} = this.props;
        if(list.length == 0){
            init();
        }
    }

    render() {
        const {list,init,total,pageSize,currentPage} = this.props
        return (
            <div>
                {/*{list.length != 0 ? <SectionMain list={list} total={total} pageSize={pageSize} init={(page,key) => {init(page,key)}}></SectionMain> : ''}*/}
                <SectionMain
                    list={list}
                    total={total}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    init={(page,key) => {init(page,key)}}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list:state.member.list,
    total:state.member.total,
    pageSize:state.member.pageSize,
    currentPage:state.member.currentPage
})

const mapDispatchToProps = {
    init:(page,key) => Init(page,key)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
