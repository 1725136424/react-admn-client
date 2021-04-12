import React, { PureComponent } from 'react';
import { Card, Form, Input, InputNumber, Cascader, Upload, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from "../../../../components/LinkButton";

class AddUpdate extends PureComponent {

    UNSAFE_componentWillMount() {
        // 初始化表格静态数据
        this.initTableInfo()
        // 初始化表单数据
        this.initFormInfo()

    }

    initTableInfo = () => {
        this.title = (
            <>
                <LinkButton style={ { marginRight: '0 10px' } }>
                    <ArrowLeftOutlined/>
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
                span: 9,
            },
        }
    }

    cascaderChange = (value) => {
        console.log(value);
    }

    render() {
        const options = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                    {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        children: [
                            {
                                value: 'xihu',
                                label: 'West Lake',
                            },
                        ],
                    },
                ],
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                    {
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [
                            {
                                value: 'zhonghuamen',
                                label: 'Zhong Hua Men',
                            },
                        ],
                    },
                ],
            },
        ];

        const { title, layout } = this
        return (
            <>
                <Card title={ title } style={ { width: '100%' } }>
                    <Form { ...layout } >
                        <Form.Item name='name' label='商品名称' rules={ [
                            { required: true, message: '请输入商品名称' }
                        ] }>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='desc' label='商品描述' rules={ [
                            { required: true, message: '请输入商品描述' }
                        ] }>
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item initialvalues={{}} name='price' label='价格' rules={ [
                            { required: true, message: '请输入商品价格' }
                        ] }>
                            <InputNumber size='middle'
                                         formatter={ value => `￥ ${ value }`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                                         parser={ value => value.replace(/￥\s?|(,*)/g, '') }/>
                        </Form.Item>
                        <Form.Item name='category' label='商品分类' rules={ [
                            { required: true, message: '请输入商品分类' }
                        ] }>
                            <Cascader options={options} onChange={this.cascaderChange} placeholder="Please select" />
                        </Form.Item>
                        <Form.Item label='商品图片' name='imgs'>
                            <Upload/>
                        </Form.Item>
                        <Form.Item label='商品详情' name='detail'>
                        </Form.Item>
                        <Button type='primary'>提交</Button>
                    </Form>
                </Card>
            </>
        );
    }
}

export default AddUpdate;
