import React from 'react'
import {Card, List} from 'antd'

const App = ({data}) => (
    <List
        grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6
        }}
        dataSource={data}
        renderItem={item => (
            <List.Item>
                <Card title={item.name}>{item.value}</Card>
            </List.Item>
        )}
    />
)

export default App
