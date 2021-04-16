import React, { PureComponent } from 'react';
import { Button, Card, Form, Input, message, Modal, Select, Table } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../../components/LinkButton'
import { editCategory, getCategorys, saveCategory } from '../../../api/index'

const { Item } = Form
const { Option } = Select

class Category extends PureComponent {

    // 创建表单对象
    saveFormRef = React.createRef();

    editFormRef = React.createRef();

    state = {
        categorys: [],
        subCategorys: [],
        columns: [],
        loading: false,
        pagination: { pageSize: 5 },
        visibleStauts: 0, // 0：添加修改都不显示，1：添加显示，2：修改显示
        confirmLoading: false,
        parentId: "0",
        parentTitle: '一级分类列表'
    }

    // 初始化表格数据
    initTableSource = async () => {
        const { parentId } = this.state
        // 获取分类数据
        this.setState({ loading: true })
        let { status, data } = await getCategorys(parentId)
        this.setState({ loading: false })
        if (status === 0) {
            data = data.map(item => ({ ...item, key: item._id }))
            if (parentId === "0") {
                this.setState({ categorys: data })
            } else {
                this.setState({ subCategorys: data })
            }

        } else {
            message.error("获取分类数据失败")
        }
        // 构造列数据
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name'
            },
            {
                title: '操作',
                width: 300,
                render: (cur) => {
                    return (
                        <div>
                            <LinkButton onClick={ () => this.showEditUI(cur) }>修改分类</LinkButton>
                            {
                                this.state.parentId === "0"?
                                    <LinkButton onClick={ () => this.watchSubCategory(cur) }>查看子分类</LinkButton>:
                                    null
                            }
                        </div>
                    )
                }
            },
        ];
        this.setState({ columns })
    }

    // modal关闭
    handleCancel = () => {
        this.setState({ visibleStauts: 0 })
    }

    // 添加分类提交
    submitAddCategory = () => {
        const { current } = this.saveFormRef
        let submitObj = current.getFieldsValue(true)
        console.log(submitObj);
        // 验证表单数据合法性
        current.validateFields()
            .then(async res => {
                // 样式选择
                this.setState({ confirmLoading: true })
                // 提交表达数据
                let { status, data } = await saveCategory(submitObj)
                if (status === 0) {
                    // 成功
                    message.success(`添加${ data.name }成功`)
                    this.handleCancel()
                    // 重置表单数据
                    current.resetFields()
                    this.initTableSource()
                } else {
                    // 失败
                    message.error(status.msg)
                }
                this.setState({ confirmLoading: false })
            })
            .catch(e => message.error("请输入合法的字段"))
    }

    // 获取修改数据，和显示修改界面
    showEditUI = (cur) => {
        this.setState({ visibleStauts: 2 }, () => {
            const { current } = this.editFormRef
            cur = { categoryId: cur._id, categoryName: cur.name }
            // 设置表单字段值
            current.setFieldsValue(cur)
        })
    }

    // 修改分类提交
    submitEditCategory = () => {
        const { current } = this.editFormRef
        let submitObj = current.getFieldsValue(true)
        // 验证表单数据合法性
        current.validateFields()
            .then(async res => {
                // 样式选择
                this.setState({ confirmLoading: true })
                // 提交修改数据
                let { status } = await editCategory(submitObj)
                if (status === 0) {
                    // 成功
                    message.success(`修改${ submitObj.categoryName }成功`)
                    this.handleCancel()
                    // 重置表单数据
                    current.resetFields()
                    this.initTableSource()
                } else {
                    // 失败
                    message.error(status.msg)
                }
                this.setState({ confirmLoading: false })
            })
            .catch(e => message.error("请输入合法的字段"))
    }

    // 查看某个分类下的子分类
    watchSubCategory = (cur) => {
        const { parentTitle } = this.state
        // 改变数据
        this.setState({ parentId: cur._id }, () => {
            const vDom = (
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <LinkButton onClick={ this.goBack }>{ parentTitle }</LinkButton>
                    <ArrowRightOutlined style={{ margin: "0 6px" }}/>
                    {
                        cur.name
                    }
                </div>
            )
            this.setState({ parentTitle: vDom })
            // 查询数据
            this.initTableSource()
        })
    }

    // 返回一级分类
    goBack = () => {
        this.setState({parentId: "0", parentTitle: "一级分类列表"})
    }

    componentDidMount() {
        this.initTableSource()
    }

    render() {
        // 额外信息
        const extra = (
            <Button onClick={ () => this.setState({ visibleStauts: 1 }) } type='primary'
                    icon={ <PlusOutlined/> }>添加</Button>
        )
        // loading
        const {
            parentTitle,
            loading,
            categorys,
            subCategorys,
            columns,
            pagination,
            visibleStauts,
            confirmLoading,
            parentId
        } = this.state
        return (
            <>
                <Card title={ parentTitle } extra={ extra } style={ { width: "100%" } }>
                    <Table dataSource={ parentId === "0"? categorys: subCategorys }
                           columns={ columns }
                           loading={ loading }
                           bordered
                           pagination={ pagination }/>;
                </Card>
                <Modal
                    title="添加分类"
                    visible={ visibleStauts === 1 }
                    onCancel={ this.handleCancel }
                    confirmLoading={ confirmLoading }
                    onOk={ this.submitAddCategory }>
                    <Form ref={ this.saveFormRef } initialValues={ { parentId: parentId, categoryName: '' } }>
                        <Item name='parentId' rules={ [{ required: true, message: '请选择父分类' }] }>
                            <Select>
                                <Option key='0' value='0'>一级分类</Option>
                                {
                                    categorys.map(item => {
                                        return (
                                            <Option key={ item.key } value={ item._id }>{ item.name }</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Item>
                        <Item name='categoryName'
                              rules={ [{ required: true, message: '请输入分类的名称' }] }>
                            <Input/>
                        </Item>
                    </Form>
                </Modal>

                <Modal
                    title="修改分类"
                    visible={ visibleStauts === 2 }
                    onCancel={ this.handleCancel }
                    confirmLoading={ confirmLoading }
                    onOk={ this.submitEditCategory }>
                    <Form ref={ this.editFormRef } initvalues={ { parentId: '0', categoryName: '' } }>
                        <Item name='categoryId' hidden>
                            <Input></Input>
                        </Item>
                        <Item name='categoryName'
                              rules={ [{ required: true, message: '请输入分类的名称' }] }>
                            <Input/>
                        </Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Category;
