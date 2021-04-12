import {
    HomeOutlined,
    AppstoreAddOutlined,
    BarsOutlined,
    ToolOutlined,
    UserAddOutlined,
    SafetyOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined,
    WindowsOutlined
} from '@ant-design/icons';

import {
    ADMIN_BAR_ROUTE,
    ADMIN_CATEGORY_ROUTE,
    ADMIN_HOME_ROUTE,
    ADMIN_LINE_ROUTE,
    ADMIN_ORDER_ROUTE,
    ADMIN_PIE_ROUTE,
    ADMIN_PRODUCT_ROUTE,
    ADMIN_ROLE_ROUTE,
    ADMIN_USER_ROUTE,
} from "../constant";
const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: ADMIN_HOME_ROUTE, // 对应的path
        icon: HomeOutlined, // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: '商品',
        key: '/products',
        icon: AppstoreAddOutlined,
        children: [ // 子菜单列表
            {
                title: '品类管理',
                key: ADMIN_CATEGORY_ROUTE,
                icon: BarsOutlined
            },
            {
                title: '商品管理',
                key: ADMIN_PRODUCT_ROUTE,
                icon: ToolOutlined
            },
        ]
    },

    {
        title: '用户管理',
        key: ADMIN_USER_ROUTE,
        icon: UserAddOutlined
    },
    {
        title: '角色管理',
        key: ADMIN_ROLE_ROUTE,
        icon: SafetyOutlined,
    },

    {
        title: '图形图表',
        key: '/charts',
        icon: AreaChartOutlined,
        children: [
            {
                title: '柱形图',
                key: ADMIN_BAR_ROUTE,
                icon: BarChartOutlined
            },
            {
                title: '折线图',
                key: ADMIN_LINE_ROUTE,
                icon: LineChartOutlined
            },
            {
                title: '饼图',
                key: ADMIN_PIE_ROUTE,
                icon: PieChartOutlined
            },
        ]
    },

    {
        title: '订单管理',
        key: ADMIN_ORDER_ROUTE,
        icon: WindowsOutlined,
    },
]

export default menuList
