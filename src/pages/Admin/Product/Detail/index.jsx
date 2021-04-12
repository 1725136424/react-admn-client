import React, { PureComponent } from 'react';
import { Card, List } from 'antd'
import LinkButton from "../../../../components/LinkButton";
import { ArrowLeftOutlined } from '@ant-design/icons'
import './index.less'
import { getCategoryById } from "../../../../api";

class Detail extends PureComponent {

    state = {
        categoryName: ''
    }

    UNSAFE_componentWillMount() {
        // 初始化表格数据
        this.initTableInfo()
    }

    initTableInfo = () => {

        // Table标题
        this.title = (
            <>
                <LinkButton style={ { marginRight: '0 10px' } }>
                    <ArrowLeftOutlined onClick={ () => this.props.history.goBack() }/>
                </LinkButton>
                商品详情
            </>
        )
    }

    initCategory = async (pCId, CId) => {
        // 获取分类数据
        if (pCId=== '0') {
            const { data: { name } } = await getCategoryById(CId)
            this.setState({ categoryName:  "一级分类列表 --> " + name})
        } else {
            const [data1, data2] = await Promise.all([getCategoryById(pCId), getCategoryById(CId)])
            this.setState({ categoryName: `${ data1.data.name } --> ${ data2.data.name }`})
        }
    }

    componentDidMount() {
        const { state } = this.props.location
        // 获取分类数据
        this.initCategory(state.pCategoryId, state.categoryId)
    }

    render() {
        const { state } = this.props.location
        const { title } = this
        return (
            <>
                <Card title={ title } style={ { width: '100%' } }>
                    <List>
                        <List.Item className='detail-ui-item'>
                            <h1 className='title'>商品名称: </h1>
                            <span className='intro'>{ state.name }</span>
                        </List.Item>
                        <List.Item className='detail-ui-item'>
                            <h1 className='title'>商品描述: </h1>
                            <span className='intro'>{ state.desc }</span>
                        </List.Item>
                        <List.Item className='detail-ui-item'>
                            <h1 className='title'>商品价格: </h1>
                            <span className='intro'>{ '￥' + state.price }</span>
                        </List.Item>
                        <List.Item className='detail-ui-item'>
                            <h1 className='title'>所属分类: </h1>
                            <span className='intro'>{ this.state.categoryName }</span>
                        </List.Item>
                        <List.Item className='detail-ui-item'>
                            <h1 className='title'>商品图片: </h1>
                            <span className='intro'>
                                {
                                    state.imgs.map(item => <img style={{ width: 150, height: 150, marginRight: 10 }} key={ item } src={ `/upload/${ item }` } alt=""/>)
                                }
                            </span>
                        </List.Item>
                        <List.Item className='detail-ui-item'>
                            <h1 className='title'>商品详情: </h1>
                            <span className='intro' dangerouslySetInnerHTML={{ __html: state.detail }}>
                            </span>
                        </List.Item>
                    </List>
                </Card>
            </>
        );
    }
}

export default Detail;
