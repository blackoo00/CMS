import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Menu, Icon } from 'antd'

const { SubMenu } = Menu

const Nav = ({ index }) => (
    <Menu
        mode="inline"
        defaultSelectedKeys={[index]}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
    >
        {/*<Menu.Item key="1">*/}
        {/*<Icon type="user" />*/}
        {/*<span>nav 1</span>*/}
        {/*</Menu.Item>*/}
        {/*<SubMenu key="sub1" title={<span><Icon type="user" /><span>User</span></span>}>*/}
        <Menu.Item key="1">
            <IndexLink to="/home">
                <Icon type="home"/>
                <span>home</span>
            </IndexLink>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to="/member">
                <Icon type="user"/>
                <span>user</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Link to="/category">
                <Icon type="bars"/>
                <span>category</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="4">
            <Link to="/products/0">
                <Icon type="profile"/>
                <span>products</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="5">
            <Link to="/orders">
                <Icon type="shopping-cart"/>
                <span>orders</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="6">
            <Link to="/stock">
                <Icon type="table"/>
                <span>stock</span>
            </Link>
        </Menu.Item>
        {/*</SubMenu>*/}
    </Menu>
)

export default Nav
