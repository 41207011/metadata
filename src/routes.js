import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Table from './views/nav2/Table.vue'
import Search2 from './views/nav2/search2.vue'
import Echarts from './views/charts/echarts.vue'
import BusinessRelation from './views/nav2/term.vue'
import Tag from './views/nav2/tag.vue'
import DetailPage from './views/nav2/detailPage.vue'
import Standard from './views/nav2/standard2.vue'
import Standard2 from './views/nav2/standard3.vue'
import Standard3 from './views/nav2/standard4.vue'
import Standard4 from './views/nav2/standard5.vue'
import DataBase from './views/nav2/dataBase.vue'
import Path from './views/path.vue'
import Throw from './views/nav2/throw.vue'


let routes = [
    {
        path: '/throw',
        component: Throw,
        name: '',
        hidden: true
    },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/path',
        component: Path,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-home fa-fw',
        leaf: true,//只有一个节点
        children: [
            { path: '/home', component: Echarts, name: '主页' , meta:{keepAlive:false},leaf:true, }
        ]
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-cubes fa-fw',//图标样式class
        leaf:true,//只有一个节点
        children: [
            { path: '/table', component: Table, name: '元数据管理'  , meta:{keepAlive:false},leaf:true,},
          /*  { path: '/main', component: Main, name: '主页', hidden: true },

            { path: '/search2', component: Search2, name: '高级搜索'},
            { path: '/user', component: User, name: '列表',hidden:true },*/
            { path: '/detailPage', component: DetailPage, name: '数据详情' , meta:{keepAlive:true}, leaf:true,},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-tags fa-fw',
        leaf: true,//只有一个节点
        children: [
            { path: '/tag', component: Tag, name: '标签管理' , meta:{keepAlive:false},leaf:true, }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '业务管理',
        iconCls: 'fa fa-tasks fa-fw',
        leaf:true,
        children: [
            { path: '/term', component: BusinessRelation, name: '业务管理' , meta:{keepAlive:true},leaf:true,},
    /*        { path: '/dataRelation', component: DataRelation, name: '元数据关联' }*/
        ]
    },
    {
        path: '/',
        component: Home,
        name: '标准维护',
        iconCls: 'fa fa-wrench fa-fw',

        leaf:true,
        children: [
            { path: '/standard', component: Standard, name: '标准维护', meta:{keepAlive:true}, leaf:true,},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据字典',
        iconCls: 'fa fa-book fa-fw',

        leaf:true,
        children: [
            { path: '/standard2', component: Standard2, name: '数据字典', meta:{keepAlive:true},leaf:true, },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '编码标准',
        iconCls: 'fa fa-edit fa-fw',

        leaf:true,
        children: [
            { path: '/standard3', component: Standard3, name: '编码标准', meta:{keepAlive:true}, leaf:true,},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据源管理',
        iconCls: 'fa fa-database fa-fw',

        leaf:true,
        children: [
            { path: '/standard4', component: Standard4, name: '数据源管理', meta:{keepAlive:true},leaf:true, },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '基础配置',
        iconCls: 'fa fa-cog fa-fw',
        children: [
            { path: '/dataBase', component: DataBase, name: '数据库配置' , meta:{keepAlive:false},leaf:true,}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '高级配置',
        iconCls: 'fa fa-cogs fa-fw',
        children: [
            { path: '/Search2', component: Search2, name: '元模型管理' , meta:{keepAlive:false},leaf:true, },
            { path: '/user', component: Search2, name: '元模型注册'  , meta:{keepAlive:false},children:[
                {path: '/tag', component: Tag, name: '标签管理'  , meta:{keepAlive:false}}
            ]},

        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }

];

export default routes;