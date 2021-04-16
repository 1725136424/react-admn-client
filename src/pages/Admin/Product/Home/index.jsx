import React, { PureComponent } from 'react';
import { Button, Card, Input, message, Select, Table } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import LinkButton from "../../../../components/LinkButton";
import {
    ADMIN_PRODUCT_ADD_ADN_UPDATE_ROUTE,
    ADMIN_PRODUCT_DETAIL_ROUTE,
    PRODUCT_PUSTAWAY_STATUS,
    PRODUCT_SOLE_OUT_STATUS,
    SEARCH_NAME
} from "../../../../constant";
import { getProducts, searchProductByCondition, updateProductStatus } from "../../../../api";
import memoryUtils from "../../../../utils/memoryUtils";

const { Option } = Select

class Home extends PureComponent {

    state = {
        products: [],
        seachType: SEARCH_NAME,
        searchValue: '',
        page: {
            current: 1,
            pageSize: 3,
            showQuickJumper: true
        },
        loading: false
    }

    // 初始化静态数据，一般放在willMount方法中
    UNSAFE_componentWillMount() {
        // 初始化card头部数据
        this.initCard()
    }

    componentDidMount() {
        this.fetchProducts()
    }

    // 获取商品数据
    fetchProducts = async (pageNum = this.state.page.current, pageSize = this.state.page.pageSize) => {
        this.setState({ loading: true })
        const { data, status } = await getProducts(pageNum, pageSize)
        this.setState({ loading: false })
        if (status === 0) {
            let { list, pageNum, pageSize, total } = data
            list = list.map(item => ({ ...item, key: item._id }))
            this.setState(state => ({ products: list, page: { ...state.page, current: pageNum, pageSize, total } }))
        } else {
            message.error('获取商品数据失败')
        }
    }

    initCard = () => {
        // 标题
        this.title = (
            <div>
                <Select defaultValue={ SEARCH_NAME } onChange={ this.changeSearchType }>
                    <Option value='name'>按名称搜索</Option>
                    <Option value='desc'>按描述搜索</Option>
                </Select>
                <Input onChange={ this.changeInput } placeholder='关键字' style={ { width: 200, margin: "0 10px" } }/>
                <Button onClick={ this.search } type='primary' icon={ <SearchOutlined/> }>搜索</Button>
            </div>
        )

        // 额外信息
        this.extra = (
            <Button onClick={ () => this.skipAddAndUpdateUI() } type='primary' icon={ <PlusOutlined/> }>添加商品</Button>
        )

        // columns
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                width: 80,
                title: '价格',
                render: (cur) => "￥" + cur.price
            },
            {
                width: 80,
                title: '状态',
                render: (cur) => {
                    return (
                        <>
                            <Button onClick={ () => this.changeProcutStatus(cur._id, cur.status) } type='primary'>
                                {
                                    cur.status === PRODUCT_PUSTAWAY_STATUS ? '下架' : '上架'
                                }
                            </Button>
                        </>
                    )
                }
            },
            {
                width: 120,
                title: '操作',
                render: (cur) => {
                    return (
                        <>
                            <LinkButton onClick={ () => this.skipDetailUI(cur) }>详情</LinkButton>
                            <LinkButton onClick={ () => this.skipAddAndUpdateUI(cur) }>修改</LinkButton>
                        </>
                    )
                }
            }
        ];
    }

    // 跳转详情界面 对于HashRouter来说是不能传递值的，所以会报空指针异常
    skipDetailUI = (cur) => {
        // 传递值
        memoryUtils.product = cur
        this.props.history.push(ADMIN_PRODUCT_DETAIL_ROUTE)
    }

    // 跳转添加修改界面
    skipAddAndUpdateUI = (cur) => {
        // 传递值
        memoryUtils.product = cur
        this.props.history.push(ADMIN_PRODUCT_ADD_ADN_UPDATE_ROUTE)
    }

    // 搜索类型的改变
    changeSearchType = (type) => {
        this.setState({ seachType: type })
    }

    // 受控组件事件监听
    changeInput = (event) => {
        const { target: { value } } = event
        this.setState({ searchValue: value })
    }

    // 搜索按钮的点击
    search = async () => {
        const { searchValue, seachType } = this.state
        if (searchValue.trim()) {
            // 发送数据
            const { data, status } = await searchProductByCondition(seachType, searchValue)
            if (status === 0) {
                const { list } = data
                this.setState({ products: list })
            } else {
                message.error('请求搜索数据失败')
            }
        } else {
            message.warning('请输入你要搜索的内容')
        }
    }

    // 上架 or 下架
    changeProcutStatus = async (id, status) => {
        let updateStatus
        if (status === PRODUCT_PUSTAWAY_STATUS) {
            // 下架
            updateStatus = PRODUCT_SOLE_OUT_STATUS
        } else if (status === PRODUCT_SOLE_OUT_STATUS) {
            // 上架
            updateStatus = PRODUCT_PUSTAWAY_STATUS
        }
        const { status: resStatus } = await updateProductStatus(id, updateStatus)
        if (resStatus === 0) {
            message.success(`商品${ updateStatus === PRODUCT_PUSTAWAY_STATUS ? '上架' : '下架' }成功`)
            // 重新获取数据
            await this.fetchProducts()
        } else {
            message.error(`商品${ updateStatus === PRODUCT_PUSTAWAY_STATUS ? '上架' : '下架' }失败`)
        }
    }

    render() {
        const { products: dataSource, page, loading } = this.state
        const { columns } = this
        return (
            <>
                <Card title={ this.title }
                      extra={ this.extra }
                      style={ { width: '100%' } }>
                    <Table onChange={ ({ current, pageSize }) => this.fetchProducts(current, pageSize) }
                           dataSource={ dataSource }
                           columns={ columns }
                           bordered
                           pagination={ page } loading={ loading }/>;
                </Card>
            </>
        );
    }


}

export default Home;
