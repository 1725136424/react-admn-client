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
const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/admin/home', // 对应的path
        icon: HomeOutlined, // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: '商品',
        key: '/admin/products',
        icon: AppstoreAddOutlined,
        children: [ // 子菜单列表
            {
                title: '品类管理',
                key: '/admin/products/category',
                icon: BarsOutlined
            },
            {
                title: '商品管理',
                key: '/admin/products/product',
                icon: ToolOutlined
            },
        ]
    },

    {
        title: '用户管理',
        key: '/admin/user',
        icon: UserAddOutlined
    },
    {
        title: '角色管理',
        key: '/admin/role',
        icon: SafetyOutlined,
    },

    {
        title: '图形图表',
        key: '/admin/charts',
        icon: AreaChartOutlined,
        children: [
            {
                title: '柱形图',
                key: '/admin/charts/bar',
                icon: BarChartOutlined
            },
            {
                title: '折线图',
                key: '/admin/charts/line',
                icon: LineChartOutlined
            },
            {
                title: '饼图',
                key: '/admin/charts/pie',
                icon: PieChartOutlined
            },
        ]
    },

    {
        title: '订单管理',
        key: '/admin/order',
        icon: WindowsOutlined,
    },
]

export default menuList
