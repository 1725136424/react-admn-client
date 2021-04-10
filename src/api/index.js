import {GET, POST} from "./ajax";
import {AMPA_KEY} from '../constant'

// 登录
export const login = (data) => POST('/login', data)

// IP定位
export const locate = () => GET('https://restapi.amap.com/v3/ip', {key: AMPA_KEY})

// 天气查询
export const queryWeather = (params) => GET('https://restapi.amap.com/v3/weather/weatherInfo',
    {...params, key: AMPA_KEY, extensions: 'base'})

// 获取所有用户
export const getAllUsers = () => GET("/manage/user/list")
