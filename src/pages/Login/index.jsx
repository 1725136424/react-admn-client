import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from "../../api";
import { setStore } from '../../utils/storageUtils'
import { ADMIN_ROUTE, USER_KEY } from "../../constant";
import logo from '../../asserts/logo.png'
import './index.less'
import { saveUser } from "../../redux/actions/user";

class Login extends PureComponent {

    submit = async (name, { values, forms }) => {
        // 发送数据
        let res = await login(values)
        let { status, data } = res

        if (status === 0) {
            // 登录成功
            // 保存用户至LocalStorage
            setStore(USER_KEY, data)
            // 保存至redux中
            this.props.saveUser(data)
            // 跳转路由
            this.props.history.push(ADMIN_ROUTE)
            message.success("登录成功")
        } else {
            // 登录失败
            message.error('登录失败')
        }
    }

    UNSAFE_componentWillMount() {
        // 已经登录跳转后台界面
        if (this.props.user && this.props.user._id) {
            this.props.history.push(ADMIN_ROUTE)
        }
    }


    render() {
        return (
            <div className="all">
                <div className="header">
                    <img src={ logo } alt=""/>
                    React项目: 后台管理系统
                </div>
                <div className="main">
                    <div className="main-top">
                        用户登陆
                    </div>
                    <Form.Provider onFormFinish={ this.submit }>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={ {
                                remember: true,
                            } }
                            onFinish={ this.onFinish }
                        >
                            <Form.Item
                                name="username"
                                rules={ [
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                    {
                                        min: 4,
                                        message: '用户名最小长度为4'
                                    },
                                    {
                                        max: 8,
                                        message: '用户名最大长度为8'
                                    },
                                    {
                                        whitespace: true,
                                        message: '用户名不能包含空格'
                                    }
                                ] }
                            >
                                <Input prefix={ <UserOutlined className="site-form-item-icon"/> } placeholder="请输入用户名"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={ [
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    },
                                    {
                                        min: 5,
                                        message: '密码最小长度为5位'
                                    },
                                    {
                                        max: 12,
                                        message: '密码最大长度为12位'
                                    },
                                    {
                                        whitespace: true,
                                        message: '密码不能包含空格'
                                    }
                                ] }
                            >
                                <Input
                                    prefix={ <LockOutlined className="site-form-item-icon"/> }
                                    type="password"
                                    placeholder="请输入密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Form.Provider>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    {
        saveUser
    }
)(Login);
