import React, { PureComponent } from 'react';
import { Button, Card } from 'antd'
import ReactECharts from 'echarts-for-react';

class BarChart extends PureComponent {

    state = {
        sale: [5, 20, 36, 10, 10, 20],
        store: [10, 40, 30, 25, 25, 23]

    }

    update = () => {
        this.setState(state => {
            const sale = state.sale.map(item => item - 1)
            const store = state.store.reduce((pre, cur) => {
                pre.push(cur - 1)
                return pre
            }, [])
            return { sale, store }
        })
    }

    // 需要注意的是，对于数据的动态更新关闭，只是变化的数据最好放在state中，这样才可能保证页面刷新，如果放入一个对象，可能导致刷新不出来
    getOption =(sale, store) => {
       return  {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量', '库存']
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sale
            }, {
                name: '库存',
                type: 'bar',
                data: store
            }]
        }
    }

    componentWillMount() {
        this.title = (
            <Button type='primary' onClick={ this.update }>更新</Button>
        )
    }

    render() {
        const { sale, store } = this.state
        const { title } = this
        const option = this.getOption(sale, store)
        return (
            <Card title={ title }>
                <Card title='柱状图'>
                    <ReactECharts option={ option }/>
                </Card>
            </Card>
        );
    }
}

export default BarChart;
