import {GET, POST} from "./ajax";
import {AMPA_KEY} from '../constant'

// 登录
export const login = (data) => POST('/login', data)

// IP定位
export const locate = () => GET('https://restapi.amap.com/v3/ip', {key: AMPA_KEY})

// 天气查询
export const queryWeather = (params) => GET('https://restapi.amap.com/v3/weather/weatherInfo',
    {...params, key: AMPA_KEY, extensions: 'base'})

// 获取分类数据
export const getCategorys = (parentId = 0) => GET('/manage/category/list', {parentId})

// 添加分类数据
export const saveCategory = (params) => POST('/manage/category/add', params)

// 修改分类数据
export const editCategory = (params) => POST('/manage/category/update', params)

// 获取所有用户
export const getAllUsers = () => GET("/manage/user/list")
