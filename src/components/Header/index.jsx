import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons';
import LinkButton from '../LinkButton'
import memoryUtils from '../../utils/memoryUtils'
import {removeStore} from '../../utils/storageUtils'
import {USER_KEY} from '../../constant'
import menuConfig from '../../config/menuConfig'
import {parse} from '../../utils/dateUtils'
import {locate, queryWeather} from '../../api'
import './index.less'

const {confirm} = Modal


class Header extends PureComponent {

    state = {
        currentTime: parse(new Date()),
        weather: ''
    }

    // 定时器方法，和异步请求都放在其中
    componentDidMount() {
        // 更新时间
        this.getTime()
        this.getWeather()
    }

    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.timer)
    }

    getNavByMenuList = (list, key) => {
        let res = {}
        for (let i = 0; i < list.length; i++) {
            let cur = list[i]
            if (!cur.children) {
                const {key: resKey} = cur
                if (resKey === key) {
                    res = cur
                    break
                }
            } else {
                if (!res.title) {
                    res = this.getNavByMenuList(cur.children, key)
                }
            }
        }
        return res
    }

    // 退出
    logout = () => {
        confirm({
            title: '您是否要退出吗？',
            icon: <ExclamationCircleOutlined/>,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                // 退出
                removeStore(USER_KEY)
                // 登出
                this.props.history.replace('/login')
            }
        });
    }

    // 获取实时时间
    getTime = () => {
        this.timer = setInterval(() => {
            // this.setState({currentTime: parse(new Date())})
            this.setState(state => state.currentTime = parse(new Date()))
        }, 1000)
    }

    // 获取天气
    getWeather = async () => {
        // 获取IP
        let {adcode} = await locate()
        // 获取天气
        let {lives} = await queryWeather({city: adcode})
        this.setState({weather: lives[0].weather})
    }

    render() {
        // 获取用户名
        let {username} = memoryUtils.user
        // 获取title
        const {pathname} = this.props.location
        const {title} = this.getNavByMenuList(menuConfig, pathname)
        // 获取动态数据
        const {currentTime, weather} = this.state
        return (
            <div className='main-header'>
                <div className='main-header-top'>
                    欢迎, {username} <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='main-header-bottom'>
                    <div className="main-header-bottom-left">
                        {
                            title
                        }
                    </div>
                    <div className="main-header-bottom-right">
                        {
                            currentTime
                        }
                        <img src="" alt=""/>
                        {
                            weather
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
