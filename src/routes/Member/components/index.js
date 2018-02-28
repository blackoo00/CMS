import React from 'react';
import { Table, Input, Button, Icon } from 'antd';

class App extends React.Component {
    state = {
        filterDropdownVisible: false,
        data:[],
        searchText: '',
        filtered: false,
        total:0,
        pageSize:0,
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
        // const reg = new RegExp(searchText, 'gi');
        const {init} = this.props;
        init(1,searchText);
        // this.setState({
        //     filterDropdownVisible: false,
        //     filtered: !!searchText,
        //     data: this.state.data.map((record) => {
        //         const match = record.nickname.match(reg);
        //         if (!match) {
        //             return null;
        //         }
        //         return {
        //             ...record,
        //             nickname: (
        //                 <span>
        //       {record.nickname.split(reg).map((text, i) => (
        //           i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
        //       ))}
        //     </span>
        //             ),
        //         };
        //     }).filter(record => !!record),
        // });
    }
    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'nickname',
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
            dataIndex: 'avatarUrl',
            render: (text) => <img style={{width:'80px'}} src={text} />
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            // filters: [{
            //     text: 'London',
            //     value: 'London',
            // }, {
            //     text: 'New York',
            //     value: 'New York',
            // }],
            // onFilter: (value, record) => record.address.indexOf(value) === 0,
        }];
        return <Table columns={columns} dataSource={this.state.data} pagination={{current:this.props.currentPage,total:this.state.total,pageSize:this.state.pageSize}} onChange={this.pageChange} rowKey="id"/>;
    }
}

export default App
