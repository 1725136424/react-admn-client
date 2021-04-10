import React, {PureComponent} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {Layout} from 'antd'
import Header from '../../components/Header'
import LaftNav from '../../components/LeftNav'
import BarChart from './BarChart'
import Category from './Category'
import Home from './Home'
import LineChart from './LineChart'
import Order from './Order'
import PieChart from './PieChart'
import Product from './Product'
import Role from './Role'
import User from './User'
import memoryUtils from "../../utils/memoryUtils";
import './index.less'
const { Footer, Sider, Content } = Layout;
class Admin extends PureComponent {

    state = {
        user: memoryUtils.user,
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
        if (!memoryUtils.user._id) {
            this.props.history.replace('/login')
        }

    }

    render() {
        const {collapsed} = this.state

        return (
            <Layout className='layout'>
                <Sider className='sider' collapsed={collapsed}>
                    <LaftNav collapsed={collapsed} toggleCollapsed={this.toggleCollapsed}/>
                </Sider>
                <Layout className='layout-layout'>
                        <Header></Header>
                    <Content className='content'>
                        <div className='content-main'>
                            <Switch>
                                <Route path='/admin/home' component={Home}/>
                                <Route path='/admin/products/category' component={Category}/>
                                <Route path='/admin/products/product' component={Product}/>
                                <Route path='/admin/user' component={User}/>
                                <Route path='/admin/role' component={Role}/>
                                <Route path='/admin/charts/bar' component={BarChart}/>
                                <Route path='/admin/charts/line' component={LineChart}/>
                                <Route path='/admin/charts/pie' component={PieChart}/>
                                <Route path='/admin/order' component={Order}/>
                                <Redirect to='/admin/home'/>
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

export default Admin;
