import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import {
    ADMIN_BAR_ROUTE,
    ADMIN_CATEGORY_ROUTE,
    ADMIN_HOME_ROUTE,
    ADMIN_LINE_ROUTE,
    ADMIN_ORDER_ROUTE,
    ADMIN_PIE_ROUTE,
    ADMIN_PRODUCT_ROUTE,
    ADMIN_ROLE_ROUTE,
    ADMIN_USER_ROUTE,
    LOGIN_ROUTE
} from "../../constant";
import Header from '../../components/Header'
import LeftNav from '../../components/LeftNav'
import BarChart from './BarChart'
import Category from './Category'
import Home from './Home'
import LineChart from './LineChart'
import Order from './Order'
import PieChart from './PieChart'
import Product from './Product'
import Role from './Role'
import User from './User'
import './index.less'

const { Footer, Sider, Content } = Layout;

class Admin extends PureComponent {

    state = {
        user: this.props.user,
        collapsed: false
    }

    // 导航菜单的切换
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    // 判断当前是否登录
    componentDidMount() {
        if (!this.props.user._id) {
            this.props.history.replace(LOGIN_ROUTE)
        }

    }

    render() {
        const { collapsed } = this.state

        return (
            <Layout className='layout'>
                <Sider className='sider' collapsed={ collapsed }>
                    <LeftNav collapsed={ collapsed } toggleCollapsed={ this.toggleCollapsed }/>
                </Sider>
                <Layout className='layout-layout'>
                    <Header/>
                    <Content className='content'>
                        <div className='content-main'>
                            <Switch>
                                <Route path={ ADMIN_HOME_ROUTE } component={ Home }/>
                                <Route path={ ADMIN_CATEGORY_ROUTE } component={ Category }/>
                                <Route path={ ADMIN_PRODUCT_ROUTE } component={ Product }/>
                                <Route path={ ADMIN_USER_ROUTE } component={ User }/>
                                <Route path={ ADMIN_ROLE_ROUTE } component={ Role }/>
                                <Route path={ ADMIN_BAR_ROUTE } component={ BarChart }/>
                                <Route path={ ADMIN_LINE_ROUTE } component={ LineChart }/>
                                <Route path={ ADMIN_PIE_ROUTE } component={ PieChart }/>
                                <Route path={ ADMIN_ORDER_ROUTE } component={ Order }/>
                                <Redirect to={ ADMIN_HOME_ROUTE } />
                            </Switch>
                        </div>
                    </Content>
                    <Footer className='footer'>
                        推荐使用谷歌浏览器，可以获得更佳页面操作体验
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(
    state => ({
        user: state.user
    })
)(Admin);
