import React, { PureComponent } from 'react';
import { Card, DatePicker, Statistic, Timeline } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined, QuestionCircleFilled, ReloadOutlined  } from '@ant-design/icons'
import { Chart, Interval, Legend, Line, Point, Tooltip } from 'bizcharts';
import './index.less'

const { RangePicker } = DatePicker

// TODO 可优化，但是没必要
class Home extends PureComponent {

    state = {
        key: 'tab1',
        noTitleKey: 'see',
        data: [
            {
                month: "Jan",
                city: "Tokyo",
                temperature: 7
            },
            {
                month: "Jan",
                city: "London",
                temperature: 3.9
            },
            {
                month: "Feb",
                city: "Tokyo",
                temperature: 6.9
            },
            {
                month: "Feb",
                city: "London",
                temperature: 4.2
            },
            {
                month: "Mar",
                city: "Tokyo",
                temperature: 9.5
            },
            {
                month: "Mar",
                city: "London",
                temperature: 5.7
            },
            {
                month: "Apr",
                city: "Tokyo",
                temperature: 14.5
            },
            {
                month: "Apr",
                city: "London",
                temperature: 8.5
            },
            {
                month: "May",
                city: "Tokyo",
                temperature: 18.4
            },
            {
                month: "May",
                city: "London",
                temperature: 11.9
            },
            {
                month: "Jun",
                city: "Tokyo",
                temperature: 21.5
            },
            {
                month: "Jun",
                city: "London",
                temperature: 15.2
            },
            {
                month: "Jul",
                city: "Tokyo",
                temperature: 25.2
            },
            {
                month: "Jul",
                city: "London",
                temperature: 17
            },
            {
                month: "Aug",
                city: "Tokyo",
                temperature: 26.5
            },
            {
                month: "Aug",
                city: "London",
                temperature: 16.6
            },
            {
                month: "Sep",
                city: "Tokyo",
                temperature: 23.3
            },
            {
                month: "Sep",
                city: "London",
                temperature: 14.2
            },
            {
                month: "Oct",
                city: "Tokyo",
                temperature: 18.3
            },
            {
                month: "Oct",
                city: "London",
                temperature: 10.3
            },
            {
                month: "Nov",
                city: "Tokyo",
                temperature: 13.9
            },
            {
                month: "Nov",
                city: "London",
                temperature: 6.6
            },
            {
                month: "Dec",
                city: "Tokyo",
                temperature: 9.6
            },
            {
                month: "Dec",
                city: "London",
                temperature: 4.8
            }
        ],
        data1: [
            { year: '1951 年', sales: 38 },
            { year: '1952 年', sales: 52 },
            { year: '1956 年', sales: 61 },
            { year: '1957 年', sales: 45 },
            { year: '1958 年', sales: 48 },
            { year: '1959 年', sales: 38 },
            { year: '1960 年', sales: 38 },
            { year: '1962 年', sales: 38 },
        ],
        scale: {
            temperature: { min: 0 },
            city: {
                formatter: v => {
                    return {
                        London: '伦敦',
                        Tokyo: '东京'
                    }[v]
                }
            }
        },
        tabListNoTitle: [
            {
                key: 'see',
                tab: '访问量',
            },
            {
                key: 'sale',
                tab: '销量量',
            }
        ]
    }

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };


    render() {
        const { data, data1, scale, tabListNoTitle } = this.state

        const contentListNoTitle = {
            see: ( <div className='tab'>
                <Card className='left' title={ '访问量' } extra={ <ReloadOutlined /> }>
                    <Chart height={ 300 } autoFit data={ data1 }>
                        <Interval position="year*sales"/>
                    </Chart>
                </Card>
                <Card className='right' title={ '任务' } extra={ <ReloadOutlined /> }>
                    <Timeline>
                        <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                        <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                        <Timeline.Item color="red">
                            <p>联调接口</p>
                            <p>功能验收</p>
                        </Timeline.Item>
                        <Timeline.Item color="green">
                            <p>登录功能设计</p>
                            <p>权限验证</p>
                            <p>页面排版</p>
                        </Timeline.Item>
                    </Timeline>
                </Card>
            </div> ),
            sale: ( <Card title={ '销售量' } extra={ <ReloadOutlined /> }>
                <Chart height={ 300 } autoFit data={ data1 }>
                    <Interval position="year*sales"/>
                </Chart>
            </Card> ),
        };

        const extra = (
            <RangePicker placeholder={ ['请选择开始时间', '请选择结束时间'] }/>
        )

        return (
            <Card>
                <div className="top">
                    <Card className='top-left' title='商品总量' extra={ <QuestionCircleFilled/> }>
                        <Statistic
                            title="周同比"
                            value={ 15 }
                            precision={ 2 }
                            valueStyle={ { color: '#cf1322', fontSize: '20px' } }
                            prefix={ <ArrowDownOutlined/> }
                            suffix="%"
                        />
                        <Statistic
                            title="日同比"
                            value={ 10 }
                            precision={ 2 }
                            valueStyle={ { color: '#3f8600', fontSize: '20px' } }
                            prefix={ <ArrowUpOutlined/> }
                            suffix="%"
                        />
                    </Card>
                    <div className="top-right">
                        <Chart scale={ scale } padding={ [30, 20, 60, 40] } autoFit height={ 320 } data={ data }
                               interactions={ ['element-active'] }>
                            <Point position="month*temperature" color="city" shape='circle'/>
                            <Line shape="smooth" position="month*temperature" color="city" label="temperature"/>
                            <Tooltip shared showCrosshairs/>
                            <Legend background={ {
                                padding: [5, 100, 5, 36],
                                style: {
                                    fill: '#eaeaea',
                                    stroke: '#fff'
                                }
                            } }/>
                        </Chart>
                    </div>
                </div>
                <div className="bottom">
                    <Card
                        style={ { width: '100%' } }
                        tabList={ tabListNoTitle }
                        activeTabKey={ this.state.noTitleKey }
                        tabBarExtraContent={ extra }
                        onTabChange={ key => {
                            this.onTabChange(key, 'noTitleKey');
                        } }
                    >
                        { contentListNoTitle[this.state.noTitleKey] }
                    </Card>
                </div>
            </Card>
        );
    }
}

export default Home;
