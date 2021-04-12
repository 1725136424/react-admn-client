import React, { PureComponent } from 'react';
import { Card, List} from 'antd'
import LinkButton from "../../../../components/LinkButton";
import { ArrowLeftOutlined } from '@ant-design/icons'
import './index.less'

class Detail extends PureComponent {

    UNSAFE_componentWillMount() {
        // 初始化表格数据
        this.initTableInfo()
    }

    initTableInfo = () => {
        this.title = (
            <>
                <LinkButton style={ { marginRight: '0 10px' } }>
                    <ArrowLeftOutlined/>
                </LinkButton>
                商品详情
            </>
        )
    }

    render() {

        const data = [
            {
                title: 'Ant Design Title 1',
            },
            {
                title: 'Ant Design Title 2',
            },
            {
                title: 'Ant Design Title 3',
            },
            {
                title: 'Ant Design Title 4',
            },
        ];

        const { title } = this
        return (
            <>
                <Card title={ title } style={{ width: '100%' }}>
                    <List
                        dataSource={data}
                        renderItem={item => (
                            <List.Item className='detail-ui-item'>
                               <h1 className='title'>{ item.title }</h1>
                                <span className='intro'>{ 11111 }</span>
                            </List.Item>
                        )}
                    />,
                </Card>
            </>
        );
    }
}

export default Detail;
