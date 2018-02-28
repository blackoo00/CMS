import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import MyHeader from './PageHeader'
import Nav from './PageNavBar'
import Main from './PageContent'
import { Layout,Icon  } from 'antd'
const { Header, Sider, Content } = Layout;

class PageLayout extends React.Component{
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    _handelLocationToKey(){
        const pathname = this.props.location.pathname;
        let key;
        switch (pathname){
            case '/home':
                key = '1';
                break;
            case '/member':
                key = '2';
                break;
            case '/category':
                key = '3';
                break;
            case '/products/0':
                key = '4';
                break;
            case '/orders':
                key = '5';
                break;
            case '/stock':
                key = '6';
                break;
        }
        return key;
    }
    render(){
        const {children,location} = this.props;
        const key = this._handelLocationToKey();
        return(
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{padding:0,height:'100%'}}>
                    {location.pathname != '/login' ? <MyHeader/> : ''}
                </Header>
                <Layout>
                    {location.pathname != '/login' ? <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.toggle}
                        style={{height:'100%'}}
                    ><Nav index={key}/></Sider> : ''}
                    {location.pathname != '/login' ? <Main>{children}</Main>
                        : <Content>{children}</Content>}
                </Layout>
            </Layout>
        )
    }
}
PageLayout.propTypes = {
    children: PropTypes.node,
}

export default PageLayout
