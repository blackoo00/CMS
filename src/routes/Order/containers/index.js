import React from 'react'
import {connect} from 'react-redux'
import ListCard from '../components/list-card'
import Prods from '../components/row-col-prod'
import {init} from '../modules/'

class App extends React.Component {
    componentWillMount() {
        let {init} = this.props;
        init(this.props.params.id)
    }

    render() {
        const data = this.props.data;
        const list = [
            {name:'ID',value:data.id},
            {name:'订单编号',value:data.order_no},
            {name:'创建时间',value:data.create_time},
            {name:'总价',value:data.total_price},
            {name:'状态',value:data.status},
            {name:'名称',value:data.snap_name},
            {name:'总数',value:data.total_count},
            {name:'地址',value:typeof data.snap_address == 'undefined' ? '' : data.snap_address.name + ' ' +
                    data.snap_address.mobile + ' ' +
                    data.snap_address.province + ' ' +
                    data.snap_address.city + ' ' +
                    data.snap_address.country + ' ' +
                    data.snap_address.detail},
        ];
        return (
            <div>
                <ListCard data={list}/>
                <Prods
                    data={data.snap_items}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.order
})

const mapDispatchToProps = {
    init: (id) => init(id)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
