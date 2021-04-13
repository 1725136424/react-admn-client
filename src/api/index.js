import { GET, POST } from "./ajax";
import { AMPA_KEY, SEARCH_DESC, SEARCH_NAME } from '../constant'

// 登录
export const login = (data) => POST('/login', data)

// IP定位
export const locate = () => GET('https://restapi.amap.com/v3/ip', { key: AMPA_KEY })

// 天气查询
export const queryWeather = (params) => GET('https://restapi.amap.com/v3/weather/weatherInfo',
    { ...params, key: AMPA_KEY, extensions: 'base' })

// 获取分类数据
export const getCategorys = (parentId = 0) => GET('/manage/category/list', { parentId })

// 添加分类数据
export const saveCategory = (params) => POST('/manage/category/add', params)

// 修改分类数据
export const editCategory = (params) => POST('/manage/category/update', params)

// 根据分类id获取分类
export const getCategoryById = (categoryId) => GET('/manage/category/info', { categoryId })

// 获取分页商品数据
export const getProducts = (pageNum = 1, pageSize = 5) => GET('/manage/product/list', { pageNum, pageSize })

// 保存商品
export const saveProduct = (params) => POST('/manage/product/add', params)

// 修改商品
export const editProduct = (params) => POST('/manage/product/update', params)

// 上传图片连接
export const uploadImg = '/api//manage/img/upload'

// 根据name和desc查询商品
export const searchProductByCondition = (type = SEARCH_DESC, keywords, pageNum = 1, pageSize = 5) => {
    if (type === SEARCH_DESC) {
        return GET('manage/product/search', { productDesc: keywords, pageNum, pageSize })
    } else if (type === SEARCH_NAME) {
        return GET('manage/product/search', { productName: keywords, pageNum, pageSize })
    }
}

// 更新商品状态
export const updateProductStatus = (productId, status) => POST('/manage/product/updateStatus', { productId, status })

// 获取所有用户
export const getAllUsers = () => GET("/manage/user/list")
