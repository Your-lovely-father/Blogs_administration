/*
@name: 路由文件
@description: 主要用于配置页面路由/创建动态路由 路由守卫拦截
@author: ZhiYuanWang
@time: 2020-08-26 10:43:10
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//重写路由
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: 'login'
        },
        //登录
        {
            path: '/login',
            component: () => import('../views/Login/Login'),
        },
        {
            path: '/mainStructure',
            component: () => import('../views/MainStructure/MainStructure'),
            redirect: '/browse',
            children: [
                //总览
                {
                    path: '/browse',
                    component: () => import('../views/Browse/Browse'),
                },
                //文章管理 发布
                {
                    path: '/articleRelease',
                    component: () => import('../views/article/articleRelease/articleRelease'),
                    meta: {
                        title: '文章管理',
                    }
                },
                //文章管理 详情发布
                {
                    path: '/detailsRelease',
                    component: () => import('../views/article/detailsRelease/detailsRelease'),
                    meta: {
                        title: '文章管理'
                    }
                },
                //留言管理
                {
                    path: '/messageVersion',
                    component: () => import('../views/message/messageVersion'),
                    meta: {
                        title: '留言管理'
                    }
                },
                //生活管理
                {
                    path: '/lifeRelease',
                    component: () => import('../views/life/lifeRelease/lifeRelease'),
                    meta: {
                        title: '生活管理'
                    }
                },
                //关于管理
                {
                    path: '/aboutRelease',
                    component: () => import('../views/about/aboutRelease/aboutRelease'),
                    meta: {
                        title: '关于管理'
                    }
                },
                //友情链接
                {
                    path: '/linkAudit',
                    component: () => import('../views/link/linkAudit/linkAudit'),
                    meta: {
                        title: '友情链接'
                    }
                },
            ],
        },
        //---------------------------------------------------    4 0 4       ----------------------------------------------
        {
            path: "/404",
            component: () => import('../views/Error/404.vue'),
        },
        {
            path: "*", // 此处需特别注意置于最底部
            redirect: "/404"
        }
    ]
});

//路由守卫
router.beforeEach((to, from, next) => {
    // to 将要进入的路由
    // from 代表从那个路径跳转而来
    // next 放行
    if (to.path === '/login') {
        return next()
    } else {
        let token=window.localStorage.getItem('token')
        if (!token) {
            return next('/login');
        } else {
            next()
        }
    }
});
export default router
