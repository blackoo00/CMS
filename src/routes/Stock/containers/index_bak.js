import React, {Component} from 'react'
import SectionMain from '../components/'
import {connect} from 'react-redux'
import { getData,searchData,initData } from '../modules/'
import moment from 'moment'

class App extends Component {
    constructor() {
        super()
    }

    componentWillMount(){
        let {getData} = this.props;
        getData(1);
    }
    _closeSearch(key){
        let searchText = this.props.stock.searchText;
        searchText[key] = '';
        return searchText;
    }

    render() {
        const {stock,searchData,closeSearch,chooseDate,chooseStatus,initData} = this.props;
        return (
            <div>
                <SectionMain
                    stock={stock}
                    init={(page = 1,key) => {searchData(page,key)}}
                    closeSearch={(key) => {closeSearch(key)}}
                    initData={() => {initData()}}
                    chooseDate={(value) => {chooseDate({
                        dateStart:moment(value[0]).format('YYYY-MM-DD'),
                        dateEnd:moment(value[1]).format('YYYY-MM-DD')
                    })}}
                    chooseStatus={(value) => {chooseStatus({status:value })}}
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
    getData:(page) => getData(page),
    searchData:(page,searchText) => searchData(page,searchText),
    closeSearch:(searchText) => searchData(1,searchText),
    chooseDate:(searchText) => searchData(1,searchText),
    chooseStatus:(searchText) => searchData(1,searchText),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
