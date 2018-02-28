import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'

const { Content } = Layout

const Main = ({ children }) => (
    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        {children}
    </Content>
)

export default Main
