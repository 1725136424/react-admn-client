// 记住用户常量
export const USER_KEY = 'user'

// AMAP KEY
export const AMPA_KEY = '5c4a52a944b898567415ab3c88f60ab0'

// 路由路径常量
export const LOGIN_ROUTE = '/login'
// 后台管理路由常量
export const ADMIN_ROUTE = '/'
export const ADMIN_HOME_ROUTE = concatPath('/home')
export const ADMIN_CATEGORY_ROUTE = concatPath('/products/category')
export const ADMIN_PRODUCT_ROUTE = concatPath('/products/product')
export const ADMIN_USER_ROUTE = concatPath('/user')
export const ADMIN_ROLE_ROUTE = concatPath('/role')
export const ADMIN_BAR_ROUTE = concatPath('/charts/bar')
export const ADMIN_LINE_ROUTE = concatPath('/charts/line')
export const ADMIN_PIE_ROUTE = concatPath('/charts/pie')
export const ADMIN_ORDER_ROUTE = concatPath('/order')
// 商品管理子路由项
export const ADMIN_PRODUCT_HOME_ROUTE = ADMIN_PRODUCT_ROUTE + '/home'
export const ADMIN_PRODUCT_ADD_ADN_UPDATE_ROUTE = ADMIN_PRODUCT_ROUTE + '/addAndUpdate'
export const ADMIN_PRODUCT_DETAIL_ROUTE = ADMIN_PRODUCT_ROUTE + '/detail'

// 搜索关键字类型
export const SEARCH_NAME = 'name'
export const SEARCH_DESC = 'desc'

// 商品状态数据
export const PRODUCT_PUSTAWAY_STATUS = 1
export const PRODUCT_SOLE_OUT_STATUS = 2

// admin标识
export const ADMIN = '管理员'


function concatPath(path) {
    return ADMIN_ROUTE === '/' ? path : ADMIN_ROUTE + path
}
