import React, {PureComponent} from 'react';
import {Button, Menu} from 'antd'
import {NavLink, withRouter} from 'react-router-dom'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import menuConfig from '../../config/menuConfig'

const {SubMenu} = Menu;

class LeftNav extends PureComponent {

    // 遍历生成导航菜单项 (map遍历)
    generateMenuListByMap = (list) => {
        return list.map(item => {
            if (item.children) {
                // 有子菜单 --> 生成子菜单项
                return (
                    <SubMenu key={item.key} title={item.title} icon={React.createElement(item.icon)}>
                        {
                            // console.log(item.children)
                            this.generateMenuListByMap(item.children)
                        }
                    </SubMenu>
                )
            } else {
                // 无子菜单 --> 生成菜单项s
                return (
                    <Menu.Item key={item.key} icon={React.createElement(item.icon)}>
                        {
                            item.title
                        }
                    </Menu.Item>
                )
            }
        })
    }

    //reduce遍历 对于reduce方法，他是一个迭代累计的方法，初始值是累计方法的初值，cur是当前遍历数组的元素
    generateMenuListByReduce = (list) => {
        return list.reduce((pre, cur) => {
            if (cur.children) {
                // 有孩子
                pre.push(
                    <SubMenu key={cur.key} title={cur.title} icon={React.createElement(cur.icon)}>
                        {
                            // console.log(item.children)
                            this.generateMenuListByReduce(cur.children)
                        }
                    </SubMenu>
                )
            } else {
                // 无孩子
                pre.push(
                    <Menu.Item key={cur.key} icon={React.createElement(cur.icon)}>
                        <NavLink to={cur.key}>
                            {
                                cur.title
                            }
                        </NavLink>
                    </Menu.Item>
                )
            }
            return pre
        }, [])
    }

    render() {
        const {collapsed, toggleCollapsed} = this.props
        const {pathname} = this.props.location
        const openKeys = pathname.substring(0, pathname.lastIndexOf("/"))
        const menuList = this.generateMenuListByReduce(menuConfig)
        return (
            <div>
                <Button type="primary" style={{marginBottom: 16}} onClick={toggleCollapsed}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu
                    selectedKeys={[pathname]}
                    defaultOpenKeys={[openKeys]}
                    mode="inline"
                    theme="dark">
                    {
                        menuList
                    }
                </Menu>
            </div>
        );
    }
}

export default withRouter(LeftNav);
