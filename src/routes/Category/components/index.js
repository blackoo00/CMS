import React from 'react';
import { Table, Input, Button, Icon } from 'antd';
import {Link} from 'react-router';

class App extends React.Component {
    state = {
        filterDropdownVisible: false,
        data:[],
        searchText: '',
        filtered: false,
        total:0,
        pageSize:0
    };
    componentWillMount(){
        const {list,total,pageSize} = this.props;
        this.setState({
            data:list,
            total:total,
            pageSize:pageSize
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data:nextProps.list,
            total:nextProps.total,
            pageSize:nextProps.pageSize
        })
    }
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }
    pageChange = (data) => {
        const {init} = this.props;
        init(data.current,this.state.searchText);
    }
    onSearch = () => {
        const { searchText } = this.state;
        const {init} = this.props;
        init(1,searchText);
    }
    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                }, () => this.searchInput && this.searchInput.focus());
            },
        },{
            title: 'Icon',
            dataIndex: 'img',
            render: (text) => <img style={{width:'80px'}} src={text.url} />
        },{
            title: 'Operation',
            dataIndex: 'id',
            render: (text) => <Link to={'products/' + text}><Button  type="primary">产品</Button></Link>
        }];
        return <Table columns={columns} dataSource={this.state.data} pagination={{total:this.state.total,pageSize:this.state.pageSize}} onChange={this.pageChange} rowKey="id"/>;
    }
}

export default App
