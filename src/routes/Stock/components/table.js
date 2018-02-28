import React from 'react'
import SnapUser from './snap-user'
import SnapProd from './snap-prod'
import { Button, Icon, Input, Table,Popover } from 'antd'

class App extends React.Component {
    state = {
        filterDropdownVisible: false,
        filterDropdownVisibleBuyer: false,
        filterDropdownVisibleOperator: false,
        searchText:{
            prodSearchText: '',
            buyerSearchText: '',
            operatorSearchText: ''
        },
        searchType:'',
        filtered: false,
        data:[],
        total:0,
        pageSize:0,
        loading: false,
    };
    componentWillMount(){
        const {...rest} = this.props;
        this.setState({
            data:rest.list,
            total:rest.total,
            pageSize:rest.pageSize,
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data:nextProps.list,
            total:nextProps.total,
            pageSize:nextProps.pageSize,
            searchText:nextProps.searchText
        })
    }
    onInputChange = (e) => {
        const type = this.state.searchType;
        const state = this.state;
        switch (type){
            case 'prod':
                state.searchText.prodSearchText = e.target.value;
                break;
            case 'buyer':
                state.searchText.buyerSearchText = e.target.value;
                break;
            case 'operator':
                state.searchText.operatorSearchText = e.target.value;
                break;
        }
        this.setState({
            ...state
        })
    }
    _handleChange = (pagination, filters, sorter) => {
        const {pageData,orderData} = this.props;
        if(Object.values(sorter).length == 0){
            pageData(pagination.current);
        }else{
            orderData({field:sorter.field,order:sorter.order});
        }
    }
    onSearch = () => {
        const searchText = this.state.searchText;
        const {searchData} = this.props;
        searchData(searchText);
    }
    readySearch = (e) => {
        this.setState({
            searchType:e.target.dataset.type
        });
    }
    render() {
        const columns = [{
            title: 'Pname',
            dataIndex: 'snap_product.name',
            key: 'product.name',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search Product Name"
                        value={this.state.searchText.prodSearchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} data-type="prod" onClick={this.readySearch}/>,
            filterDropdownVisibleBuyer: this.state.filterDropdownVisibleBuyer,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisibleBuyer: visible,
                }, () => this.searchInput && this.searchInput.focus());
            },
        },{
            title: 'Icon',
            dataIndex: 'snap_product.main_img_url',
            render: (text, record) =>
                <Popover content={<SnapProd info={record.snap_product}/>} title={record.snap_product.name} trigger="hover">
                    <img style={{width:'80px'}} src={text} />
                </Popover>,
        },{
            title: 'Change',
            dataIndex: 'stock',
            defaultSortOrder: '',
            sorter: true,
        },{
            title: 'Time',
            dataIndex: 'create_time',
            sorter: true,
        },{
            title: 'Status',
            dataIndex: 'status',
        },{
            title: 'Buyer',
            dataIndex: 'snap_user.nickname',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search Buyer Name"
                        value={this.state.searchText.buyerSearchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            render: (text, record) =>
                <Popover content={<SnapUser info={record.snap_user}/>} title={text} trigger="hover">
                    {text}
                </Popover>,
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} data-type="buyer" onClick={this.readySearch}/>,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                }, () => this.searchInput && this.searchInput.focus());
            },
        },{
            title: 'Operator',
            dataIndex: 'snap_login.app_id',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search Operator Name"
                        value={this.state.searchText.operatorSearchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} data-type="operator" onClick={this.readySearch}/>,
            filterDropdownVisibleOperator: this.state.filterDropdownVisibleOperator,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisibleOperator: visible,
                }, () => this.searchInput && this.searchInput.focus());
            },
        },{
            title: 'Remark',
            dataIndex: 'remark',
        }];
        return <Table columns={columns}
                      rowClassName={record => record.snap_login === null ? '' : 'stock_by_operator'}
                      dataSource={this.state.data}
                      pagination={{total:this.state.total,pageSize:this.state.pageSize}}
                      loading={this.state.loading}
                      onChange={this._handleChange} rowKey="id"/>;
    }
}

export default App
