import React from 'react'
import { Card, Col, Row } from 'antd';

const SectionMain = ({data}) => (
    <div style={{ background: '#ECECEC', padding: '30px', }}>
        <Row gutter={16}>
            <Col span={8}>
                <Card title="会员信息" bordered={true}>{data.user_data}</Card>
            </Col>
            <Col span={8}>
                <Card title="商品信息" bordered={false}>
                    <p>全部商品:{data.prod_data.total_count}</p>
                    <p>销售中:{data.prod_data.on_sale}</p>
                </Card>
            </Col>
            <Col span={8}>
                <Card title="订单信息" bordered={false}>
                    <p>未付款:{data.order_data.order_status1}</p>
                    <p>已付款:{data.order_data.order_status2}</p>
                    <p>已发货:{data.order_data.order_status3}</p>
                    <p>库存不足:{data.order_data.order_status4}</p>
                </Card>
            </Col>
        </Row>
    </div>
)

export default SectionMain
