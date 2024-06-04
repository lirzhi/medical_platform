import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let OriginPush = VueRouter.prototype.push;
let OriginReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        OriginPush.call(this, location, resolve, reject);
    }
    else {
        OriginPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        OriginReplace.call(this, location, resolve, reject);
    }
    else {
        OriginReplace.call(this, location, () => { }, () => { });
    }
}

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: () => import('@/views/Main.vue'),
        redirect: '/MainPage',
        children: [
            {
                path: '/MainPage',
                name: 'MainPage',
                meta: {
                    title: '主页'
                },
                component: () => import('@/views/MainPage')
            },
            {
                path: '/Login',
                name: 'Login',
                meta: {
                    title: '登录'
                },
                component: () => import('@/views/Login')
            },
            {
                path: '/InstitutionList',
                name: 'InstitutionList',
                meta: {
                    title: '现有机构'
                },
                component: () => import('@/views/InstitutionList')
            },
            {
                path: '/InsApproval',
                name: 'InsApproval',
                meta: {
                    title: '机构组网审批'
                },
                component: () => import('@/views/InsApproval')
            },
            {
                path: '/ProjectList',
                name: 'ProjectList',
                meta: {
                    title: '现有项目'
                },
                component: () => import('@/views/ProjectList')
            },
            {
                path: '/ProApproval',
                name: 'ProApproval',
                meta: {
                    title: '建项申请审批'
                },
                component: () => import('@/views/ProApproval')
            },
            {
                path: '/ProModificationApproval',
                name: 'ProModificationApproval',
                meta: {
                    title: '项目修改审批'
                },
                component: () => import('@/views/ProModificationApproval')
            },
            
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router