import React, { PureComponent } from 'react';
import { Button, Card, Cascader, Form, Input, InputNumber, message, Modal, Upload } from 'antd'
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import LinkButton from "../../../../components/LinkButton";
import RichText from './RichText/'
import { editProduct, getCategorys, saveProduct, uploadImg } from "../../../../api";
import { getBase64 } from "../../../../utils/fileUtils";
import { ADMIN_PRODUCT_HOME_ROUTE } from "../../../../constant";

class AddUpdate extends PureComponent {

    refForm = React.createRef()

    state = {
        categorys: [],
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    };

    UNSAFE_componentWillMount() {
        // 初始化表格静态数据
        this.initTableInfo()
        // 初始化表单数据
        this.initFormInfo()

    }

    // 初始化静态数据
    initTableInfo = () => {
        this.title = (
            <>
                <LinkButton style={ { marginRight: '0 10px' } }>
                    <ArrowLeftOutlined onClick={ () => this.props.history.goBack() }/>
                </LinkButton>
                添加商品
            </>
        )
    }
    initFormInfo = () => {
        this.layout = {
            labelCol: {
                span: 2,
            },
            wrapperCol: {
                span: 8,
            },
        }
    }

    // 获取一级分类数据
    fetchParentCategory = async () => {
        let { data } = await getCategorys()
        data = data.map(item => ({ ...item, isLeaf: false }))
        console.log(data);
        this.setState({ categorys: data })
    }

    // 动态加载分类数据
    lazyLoadOption = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true
        // 获取二级分类数据
        const { data } = await getCategorys(targetOption._id)
        targetOption.loading = false
        if (data.length !== 0) {
            targetOption.children = data
        } else {
            targetOption.isLeaf = true
        }
        this.setState({ categorys: [...this.state.categorys] })
    }

    // 图片modal关闭
    handleCancel = () => this.setState({ previewVisible: false });

    // 图片预览
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    // 上传图片回调
    handleChange = ({ fileList }) => {
        // 获取当前上传的图片
        let lastFile = fileList[fileList.length - 1]
        if (lastFile) {
            const { uid, percent, status, response, name } = lastFile
            let imgObject
            if (response) {
                // 返回响应
                const { status: statusCode, data } = response
                if (statusCode === 0) {
                    const { name, url } = data
                    imgObject = {
                        uid: uid,
                        percent,
                        status,
                        name,
                        url
                    }
                } else {
                    message.error('上传图片失败')
                    imgObject = {
                        name,
                        percent,
                        uid: uid,
                        status: 'error',
                        error: '上传图片失败'
                    }
                }
            } else {
                imgObject = {
                    uid: uid,
                    percent,
                    status
                }
            }
            fileList[fileList.length - 1] = imgObject
            this.setState({ fileList });
        }
    }

    // 移出图片
    handleRemove = (file) => {
        const { fileList } = this.state
        const filterAry = fileList.filter(item => file.uid !== item.uid)
        this.setState({ fileList: filterAry })
    }

    // 提交表单
    submitForm = () => {
        const { current } = this.refForm
        // 校验数据合法性
        current.validateFields()
            .then(async res => {
                // 构造商品实体对象
                const [pCategoryId, categoryId] = res.category
                // 获取商品图片数据
                const { fileList } = this.state
                const imgs = fileList.map(item => item.name)
                // 获取富文本编辑器的html
                const detail = this.rich.submitHtmlToFather()
                res = { ...res, pCategoryId, categoryId, imgs, detail }
                if (res._id) {
                    // 修改
                    const { status } = await editProduct(res)
                    if (status === 0) {
                        message.success('修改商品成功')
                        // 跳转
                        this.props.history.replace(ADMIN_PRODUCT_HOME_ROUTE)
                    } else {
                        message.error('修改商品失败')
                    }
                } else {
                    // 添加
                    const { status } = await saveProduct(res)
                    if (status === 0) {
                        message.success('保存商品成功')
                        // 跳转
                        this.props.history.replace(ADMIN_PRODUCT_HOME_ROUTE)
                    } else {
                        message.error('保存商品失败')
                    }
                }

            })
            .catch(e => console.log(e))
    }

    // 构造修改数据
    initUpdateData = async (data) => {
        // 设置商品图片
        const fileList = data.imgs.map(item => {
            return {
                uid: item,
                name: item,
                status: 'done',
                url: `/api/upload/${ item }`
            }
        })
        this.setState({ fileList })
        // 设置商品详情
        this.rich.setHtmlToRich(data.detail)
        // 设置表单数据
        const { current } = this.refForm
        // 设置分类
        data.category = [data.pCategoryId, data.categoryId]
        // 获取二级
        const { data: subCategory } = await getCategorys(data.pCategoryId)
        const formatCategory = this.state.categorys.map(item => {
            if (item._id === data.pCategoryId) {
                item.children = subCategory
            }
            return item
        })
        this.setState({ categorys: formatCategory })
        // 设置表单数据
        current.setFieldsValue(data)
    }

    componentDidMount() {
        // 获取分类数据
        this.fetchParentCategory()
        // 判断当前是否为增加还是修改操作
        const { state } = this.props.location
        if (state) {
            // 构造修改数据
            this.initUpdateData(state)
        }
    }

    render() {
        const { title, layout } = this
        const { categorys } = this.state
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;

        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div style={ { marginTop: 8 } }>Upload</div>
            </div>
        );
        return (
            <>
                <Card title={ title } style={ { width: '100%' } }>
                    <Form ref={ this.refForm } { ...layout } >
                        <Form.Item hidden name='_id'>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='name' label='商品名称' rules={ [
                            { required: true, message: '请输入商品名称' }
                        ] }>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='desc' label='商品描述' rules={ [
                            { required: true, message: '请输入商品描述' }
                        ] }>
                            <Input.TextArea autoSize/>
                        </Form.Item>
                        <Form.Item initialvalues={ {} } name='price' label='价格' rules={ [
                            { required: true, message: '请输入商品价格' }
                        ] }>
                            <InputNumber min={ 1 } size='middle'
                                         formatter={ value => `￥ ${ value }`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                                         parser={ value => value.replace(/￥\s?|(,*)/g, '') }/>
                        </Form.Item>
                        <Form.Item name='category' label='商品分类' rules={ [
                            { required: true, message: '请输入商品分类' }
                        ] }>
                            <Cascader changeOnSelect
                                      fieldNames={ { value: '_id', label: 'name' } }
                                      loadData={ this.lazyLoadOption }
                                      options={ categorys }
                                      placeholder="请选择所属分类"/>
                        </Form.Item>
                        <Form.Item label='商品图片'>
                            <Upload
                                name='image'
                                action={ uploadImg }
                                listType="picture-card"
                                fileList={ fileList }
                                onPreview={ this.handlePreview }
                                onChange={ this.handleChange }
                                onRemove={ this.handleRemove }
                            >
                                { fileList.length >= 4 ? null : uploadButton }
                            </Upload>
                            <Modal
                                visible={ previewVisible }
                                title={ previewTitle }
                                footer={ null }
                                onCancel={ this.handleCancel }
                            >
                                <img alt="图片" style={ { width: '100%' } } src={ previewImage }/>
                            </Modal>
                        </Form.Item>
                        <Form.Item label='商品详情' labelCol={ { span: 2, } } wrapperCol={ { span: 18 } }>
                            <RichText ref={ rich => this.rich = rich }/>
                        </Form.Item>
                        <Button onClick={ this.submitForm } type='primary'>提交</Button>
                    </Form>
                </Card>
            </>
        );
    }
}

export default AddUpdate;
