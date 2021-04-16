import React, { PureComponent } from 'react';
import { Button, Card, message, Table, Form, Input, Modal } from 'antd'
import { getAllRole, saveRole } from "../../../api";
import PermissonModal from './PermissonModal/index'
import { parseDate } from "../../../utils/dateUtils";

const { Item } = Form

class Role extends PureComponent {

    state = {
        disabled: true,
        loading: false,
        roles: [],
        visible: false,
        confirmLoading: false,
        selectedRow: {},
        modalVisible: false
    }

    // 添加角色
    addRole = () => {
        this.setState({ visible: true }, () => {
            // 重置表单数据
            this.form.resetFields()
        })
    }

    // 点击确认添加角色
    handleOk = () => {
        // 校验表单数据
        this.form.validateFields()
            .then(res => {
                // 保存角色
                this.setState({ confirmLoading: true }, async () => {
                    const { status } = await saveRole(res)
                    this.setState({ confirmLoading: false })
                    if (status === 0) {
                        this.setState({ visible: false })
                        this.fetchRoles()
                    } else {
                        message.error('添加角色失败')
                    }
                })
            })
            .catch(e => message.error('请输入正确的表单数据'))
    }

    // 取消按钮点击
    handleCancel = () => {
        this.setState({ visible: false })
    }

    // 设置角色权限
    setPermission = () => {
        const { selectedRow } = this.state
        if (selectedRow) {
            // 显示分配模态框
            this.setState({ modalVisible: true })
        } else {
            message.error('操作异常')
        }

    }

    // 选择行
    changeRow = (selectedRowKeys, selectedRows) => {
        // 修改当前按钮的状态
        const { disabled } = this.state
        if (disabled) {
            this.setState({ disabled: false })
        }
        this.setState({ selectedRow: selectedRows[0]})
    }

    // 获取角色数据
    fetchRoles = async () => {
        this.setState({ loading: true })
        let { status, data } = await getAllRole()
        this.setState({ loading: false })
        if (status === 0) {
            data = data.map(item => ({ ...item, key: item._id }))
            // 成功
            this.setState({ roles: data })
        } else {
            // 失败
            message.error('获取角色数据失败')
        }
    }

    // 初始化表格数据
    initTableInfo = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                render: (cur) => cur.create_time? parseDate(new Date(cur.create_time)): null
            },
            {
                title: '授权时间',
                render: (cur) => cur.auth_time? parseDate(new Date(cur.auth_time)): null
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            },
        ];
    }

    // 子组件的隐藏消息
    showAndHideSon = (visible) => {
        this.setState({ modalVisible: visible })
    }

    UNSAFE_componentWillMount() {
        this.initTableInfo()
    }

    componentDidMount() {
        this.fetchRoles()
    }

    render() {

        const {
            disabled,
            loading,
            roles,
            visible,
            confirmLoading,
            selectedRow,
            modalVisible
        } = this.state

        const { columns, handleOk, handleCancel } = this

        const title = (
            <>
                <Button type='primary' onClick={ this.addRole } style={ { marginRight: 20 } }>创建角色</Button>
                <Button type='primary' onClick={ this.setPermission } disabled={ disabled }>设置角色权限</Button>
            </>
        )

        const rowSelection = { type: 'radio', onChange: this.changeRow }
        return (
            <div>
                <Card title={ title }>
                    <Table
                        loading={ loading }
                        dataSource={ roles }
                        columns={ columns }
                        rowSelection={ rowSelection }
                        pagination={ { pageSize: 3 } }/>
                </Card>
                <Modal
                    title="添加角色"
                    visible={ visible }
                    onOk={ handleOk }
                    confirmLoading={ confirmLoading }
                    onCancel={ handleCancel }
                >
                    <Form ref={ (form) => this.form = form }>
                        <Item name='roleName'
                              label='角色名称'
                              rules={[{ required: true, message: '请输入角色名称' }]}>
                            <Input placeholder='请输入角色名称'/>
                        </Item>
                    </Form>
                </Modal>
                <PermissonModal selectedRow={ selectedRow }
                                setVisible={ this.showAndHideSon }
                                fetchRoles={ this.fetchRoles }
                                visible={ modalVisible }/>
            </div>
        );
    }
}

export default Role;
