import React, { PureComponent } from 'react';
import { Form, Input, message, Modal, Select } from 'antd'
import PropTypes from 'prop-types'
import { addAndUpdateUser } from "../../../../api";

const { Item } = Form
const { Option } = Select

class AddAndUpdate extends PureComponent {

    static propTypes = {
        roles: PropTypes.array.isRequired,
        fetchUser: PropTypes.func.isRequired
    }

    state = {
        visible: false,
        confirmLoading: false,
        type: ''
    }

    // 提交
    handleOk = async () => {
        const { type } = this.state
        this.setState({ confirmLoading: true })
        // 表单获取数据
        const form = this.form
        try {
            const values = await form.validateFields()
            const { status } = await addAndUpdateUser(type, values)
            this.setState({ confirmLoading: false })
            if (status === 0) {
                // 关闭模态框
                this.setState({ visible: false })
                // 获取数据
                this.props.fetchUser()
            } else {
                message.error(`${ type === 'edit'? '编辑': '添加' }角色失败`)
            }
        } catch (e) {
            message.error('表单校验不合法')
        }

        // 发送动态请求
        // addAndUpdateUser()
    }

    // 取消模态框
    handleCancel = () => {
        this.setState({ visible: false })
    }

    showModal = (type, cur) => {

        // 设置操作类型
        this.setState({ type, visible: true }, () => {
            // 重置表单
            this.form.resetFields()
            if (cur) {
                this.form.setFieldsValue(cur)
            }
        })
    }

    UNSAFE_componentWillMount() {
        this.layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 16,
            },
        }
    }

    render() {
        const { visible, confirmLoading, type } = this.state
        const { roles } = this.props
        const { layout } = this
        return (
            <>
                <Modal
                    title={ type === 'update' ? '编辑角色' : '添加角色' }
                    visible={ visible }
                    onOk={ this.handleOk }
                    confirmLoading={ confirmLoading }
                    onCancel={ this.handleCancel }
                >
                    <Form ref={ form => this.form = form }{ ...layout }>
                        <Item name='_id'
                              hidden>
                            <Input/>
                        </Item>
                        <Item name='username'
                              label='用户名'
                              rules={ [{ required: true, message: '请输入用户名' }] }>
                            <Input placeholder='请输入用户名'/>
                        </Item>
                        {
                            type !== 'update' ? <Item name='password'
                                                      label='密码'
                                                      rules={ [{ required: true, message: '请输入密码' }] }>
                                <Input placeholder='请输入密码'/>
                            </Item> : null
                        }
                        <Item name='phone'
                              label='手机号'
                              rules={ [{ required: true, message: '请输入手机号' }] }>
                            <Input placeholder='请输入手机号'/>
                        </Item>
                        <Item name='email'
                              label='邮箱'
                              rules={ [{ required: true, message: '请输入邮箱' }] }>
                            <Input placeholder='请输入邮箱'/>
                        </Item>
                        <Item name='role_id'
                              label='角色'
                              rules={ [{ required: true, message: '请输入你所属的角色' }] }>
                            <Select placeholder='请输入你所属的角色'>
                                {
                                    roles.map(item => {
                                        return (
                                            <Option key={ item._id } value={ item._id }>{ item.name }</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default AddAndUpdate;
