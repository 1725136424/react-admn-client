import React, { PureComponent } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Menu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import menuConfig from '../../config/menuConfig'
import { ADMIN, ADMIN_HOME_ROUTE, ADMIN_PRODUCT_ROUTE } from "../../constant";
import { setMenu } from "../../redux/actions/menu";

const { SubMenu } = Menu;


class LeftNav extends PureComponent {

    // 遍历生成导航菜单项 (map遍历)
    /*generateMenuListByMap = (list, role) => {
        return list.map(item => {
            if (item.children) {
                // 有子菜单 --> 生成子菜单项
                if (role.name === ADMIN || role.menus.indexOf('/home') || role.menus.indexOf(item.key) !== -1) {
                    return (
                        <SubMenu key={ item.key } title={ item.title } icon={ React.createElement(item.icon) }>
                            {
                                this.generateMenuListByMap(item.children, role)
                            }
                        </SubMenu>
                    )
                }
            } else {
                // 无子菜单 --> 生成菜单项s
                if (role.name === ADMIN || role.menus.indexOf('/home') || role.menus.indexOf(item.key) !== -1) {
                    return (
                        <Menu.Item key={ item.key } icon={ React.createElement(item.icon) }>
                            {
                                item.title
                            }
                        </Menu.Item>
                    )
                }
            }
        })
    }*/

    //reduce遍历 对于reduce方法，他是一个迭代累计的方法，初始值是累计方法的初值，cur是当前遍历数组的元素
    generateMenuListByReduce = (list, role) => {
        // TODO 第二次redux优化
        return list.reduce((pre, cur) => {
            if (cur.children) {
                // 有孩子
                if (role.name === ADMIN || cur.key === ADMIN_HOME_ROUTE || role.menus.indexOf(cur.key) !== -1) {
                    pre.push(
                        <SubMenu key={ cur.key } title={ cur.title } icon={ React.createElement(cur.icon) }>
                            {
                                this.generateMenuListByReduce(cur.children, role)
                            }
                        </SubMenu>
                    )
                }
            } else {
                // 无孩子
                if (role.name === ADMIN || cur.key === ADMIN_HOME_ROUTE || role.menus.indexOf(cur.key) !== -1) {
                    pre.push(
                        <Menu.Item key={ cur.key } icon={ React.createElement(cur.icon) }>
                            <NavLink to={ cur.key }>
                                {
                                    cur.title
                                }
                            </NavLink>
                        </Menu.Item>
                    )
                }
            }
            return pre
        }, [])
    }

    // 保存导航栏状态
    saveNavStatus = () => {
        let { pathname: selectedKey } = this.props.location
        if (selectedKey.indexOf(ADMIN_PRODUCT_ROUTE) !== -1) {
            selectedKey = ADMIN_PRODUCT_ROUTE
        }
        this.selectKey = selectedKey
        this.openKey = selectedKey.substring(0, selectedKey.lastIndexOf("/"))
    }

    // 根据menu_name 获取菜单对象
    getMenuByMenuName = (list, key) => {
        let cur = {}
        for (let i = 0; i < list.length; i++) {
            const item = list[i]
            if (!item.children) {
                if (item.key === key) {
                    cur = item
                    break
                }
            } else {
                if (!cur.title) {
                    cur = this.getMenuByMenuName(item.children, key)
                }
            }
        }
        return cur
    }

    // 选中menu保存数据至redux中，不能写在渲染函数中，这样会导致函数递归调用
    selectMenu = ({ key }) => {
        // 保存至redux中
        this.props.setMenu(this.getMenuByMenuName(menuConfig, key))
    }

    render() {
        this.saveNavStatus()
        // 根据权限获取菜单列表
        const { role } = this.props.user
        const menuList = this.generateMenuListByReduce(menuConfig, role)
        const { openKey, selectKey } = this
        const { collapsed, toggleCollapsed } = this.props
        return (
            <div>
                <Button type="primary" style={ { marginBottom: 16 } } onClick={ toggleCollapsed }>
                    { React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined) }
                </Button>
                <Menu
                    onSelect={ this.selectMenu }
                    selectedKeys={ [selectKey] }
                    defaultOpenKeys={ [openKey] }
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

export default connect(
    state => ({
        user: state.user,
        menu: state.menu
    }),
    {
        setMenu
    }
)(withRouter(LeftNav));
