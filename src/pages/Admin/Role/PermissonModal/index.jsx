import React, { PureComponent } from 'react';
import { Form, Input, Modal, Tree, message } from 'antd'
import PropTypes from 'prop-types'
import menuConfig from "../../../../config/menuConfig";
import { getStore, removeStore, setStore } from "../../../../utils/storageUtils";
import { USER_KEY } from "../../../../constant";
import { assignPermission } from "../../../../api";

const { Item } = Form

class PermissonModal extends PureComponent {

    static propTypes = {
        fetchRoles: PropTypes.func.isRequired
    }

    state = {
        visible: false,
        confirmLoading: false

    }

    handleOk = async () => {
        // 获取数据
        const { _id } = this.props.selectedRow
        const menus = this.checkedKeys
        // TODO redux优化
        const { username } = getStore(USER_KEY)
        const object = {
            _id,
            menus,
            auth_name: username,
            auth_time: new Date().getTime()
        }
        // 获取所选择的树形结构
        this.setState({ confirmLoading: true })
        const { status, data } = await assignPermission(object)
        this.setState({ confirmLoading: false })
        if (status === 0) {
            // 更新store中的权限
            const user = getStore(USER_KEY)
            if (user.role_id === data._id) {
                // 为该角色，更新权限
                user.role = data
                removeStore(USER_KEY)
                setStore(USER_KEY, user)
            }
            message.success('分配权限成功')
            this.setState({ visible: false })
            this.props.fetchRoles()
        } else {
            message.error('分配权限失败')
        }
    }

    handleCancel = () => {
        this.setState({ visible: false })
    }

    treeCheck = (checkedKeys) => {
        this.checkedKeys = checkedKeys.filter(item => item !== '/all')
    }

    UNSAFE_componentWillMount() {
        // 设置菜单数据
        // 构造数据
        this.menus = [{ title: '平台权限', key: '/all', children: menuConfig }]
    }

    render() {
        const {
            visible,
            confirmLoading
        } = this.state
        const { selectedRow } = this.props
        const { handleOk, handleCancel, menus } = this
        return (
            <>
                <Modal
                    title="分配权限"
                    visible={ visible }
                    onOk={ handleOk }
                    confirmLoading={ confirmLoading }
                    onCancel={ handleCancel }>
                    <Form ref={ (form) => this.form = form }>
                        <Item initialValue={ selectedRow.name } name='roleName'
                              label='角色名称'
                              rules={ [{ required: true, message: '请输入角色名称' }] }>
                            <Input disabled/>
                        </Item>
                    </Form>
                    <Tree
                        defaultCheckedKeys={ selectedRow.menus }
                        defaultExpandAll={ true }
                        checkable
                        onCheck={ this.treeCheck }
                        treeData={ menus }
                    />
                </Modal>
            </>
        );
    }
}

export default PermissonModal;
