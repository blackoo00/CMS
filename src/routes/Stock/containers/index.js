import React, {Component} from 'react'
import SectionMain from '../components/'
import {connect} from 'react-redux'
import { pageData,searchData,initData,orderData } from '../modules/'
import moment from 'moment'

class App extends Component {
    constructor() {
        super()
    }
    componentWillMount(){
        const key = this.props.location.query.key;
        let {initData,searchData} = this.props;
        if(key){
            searchData({
                prodSearchText: key,
            })
        }else{
            initData();
        }
    }
    render() {
        const {stock,searchData,initData,orderData} = this.props;
        return (
            <div>
                <SectionMain
                    stock={stock}
                    searchData = {(searchText) => {searchData(searchText)}}
                    orderData = {(orderText) => {orderData(orderText)}}
                    pageData = {(page) => {pageData(page)}}
                    closeSearch={(key) => {searchData(key)}}
                    initData={() => {initData()}}
                    chooseDate={(value) => {searchData({
                        dateStart:moment(value[0]).format('YYYY-MM-DD'),
                        dateEnd:moment(value[1]).format('YYYY-MM-DD')
                    })}}
                    chooseStatus={(value) => {searchData({status:value })}}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    stock:state.stock,
    initStatus:state.stock.init
})

const mapDispatchToProps = {
    initData:() => initData(),
    pageData:(page) => pageData(page),
    searchData:(searchText) => searchData(searchText),
    orderData:(orderText) => orderData(orderText),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
