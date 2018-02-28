import {Table} from 'antd';
import React from 'react';

const columns = [{
    title: '商品',
    dataIndex: 'name'
},{
    title: '图标',
    dataIndex: 'main_img_url',
    render: (text) => <img style={{width:'80px'}} src={text} />
}, {
    title: '数量',
    dataIndex: 'count'
}, {
    title: '总价',
    dataIndex: 'totalPrice'
}]

const App = ({data}) => (
    <div>
        <Table pagination={false} columns={columns} dataSource={data} size="small"/>
    </div>
)
export default App
