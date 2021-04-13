import React, { PureComponent } from 'react';
import { Button, Card, message, Modal, Table } from 'antd'
import { ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons'
import LinkButton from "../../../components/LinkButton";
import AddAndUpdate from "./AddAndUpdate";
import { deleteUser, getAllUsers } from "../../../api";
import { parseDate } from "../../../utils/dateUtils";

class User extends PureComponent {

    state = {
        users: [],
        roles: [],
        loading: false
    }

    // 初始化静态数据
    UNSAFE_componentWillMount() {
        this.title = (
            <Button onClick={ () => this.triggerSon('add') } type='primary' icon={ <UserAddOutlined/> }>创建用户</Button>
        )

        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'name',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'age',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'address',
            },
            {
                title: '注册时间',
                render: (cur) => parseDate(new Date(cur.create_time))
            },
            {
                title: '所属角色',
                render: (cur) => this.fetchRoleById(cur.role_id),
            },
            {
                width: 150,
                title: '操作',
                render: (cur) => <><LinkButton
                    onClick={ () => this.triggerSon('update', cur) }>修改</LinkButton><LinkButton
                    onClick={ () => this.deleteUser(cur._id) }>删除</LinkButton></>
            },
        ];
    }

    // 发送网络请求
    componentDidMount() {
        this.fetchUser()
    }

    // 触发子组件调用
    triggerSon = (type, cur) => {
        // 触发子组件回调
        this.modal.showModal(type, cur)
    }

    // 删除用户
    deleteUser = (id) => {
        Modal.confirm({
            title: '警告',
            icon: <ExclamationCircleOutlined/>,
            content: '你是否需要删除该用户吗？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                const { status } = await deleteUser(id)
                if (status === 0) {
                    this.fetchUser()
                    message.success('删除成功')
                } else {
                    message.error('删除失败')
                }
            }
        });
    }

    // 查询所有用户
    fetchUser = async () => {
        this.setState({ loading: true })
        let { data: { users, roles }, status } = await getAllUsers()
        this.setState({ loading: false })
        if (status === 0) {
            users = users.map(item => ({ ...item, key: item._id }))
            this.setState({ users, roles })
        } else {
            message.error('获取用户列表失败')
        }
    }

    // 根据角色id查询角色
    fetchRoleById = (role_id) => {
        const { roles } = this.state
        const result = roles.find(item => item._id === role_id) || {}
        return result.name
    }

    render() {
        const { loading, users, roles } = this.state
        const { columns } = this
        return (
            <div>
                <Card title={ this.title }>
                    <Table pagination={ { pageSize: 3 } } loading={ loading }
                           bordered
                           dataSource={ users }
                           columns={ columns }/>;
                </Card>
                <AddAndUpdate roles={ roles } fetchUser={ this.fetchUser } ref={ modal => this.modal = modal }/>
            </div>
        );
    }

}

export default User;
