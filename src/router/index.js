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
                path: '/NetworkingGroup',
                name: 'NetworkingGroup',
                meta: {
                    title: '组网组管理'
                },
                component: () => import('@/views/NetworkingGroup')
            },
            {
                path: '/InstitutionNetworking',
                name: 'InstitutionNetworking',
                meta: {
                    title: '机构组网管理'
                },
                component: () => import('@/views/InstitutionNetworking')
            },
            {
                path: '/LeadingProjects',
                name: 'LeadingProjects',
                meta: {
                    title: '本机构主持项目'
                },
                component: () => import('@/views/LeadingProjects')
            },
            {
                path: '/ParticipatingProjects',
                name: 'ParticipatingProjects',
                meta: {
                    title: '本机构参与项目'
                },
                component: () => import('@/views/ParticipatingProjects')
            },
            {
                path: '/AccountManage',
                name: 'AccountManage',
                meta: {
                    title: '账号管理'
                },
                component: () => import('@/views/AccountManage')
            },
            {
                path: '/RelationshipSystem',
                name: 'RelationshipSystem',
                meta: {
                    title: '关系系统'
                },
                component: () => import('@/views/RelationshipSystem')
            },
            {
                path: '/DigitalObjectApply',
                name: 'DigitalObjectApply',
                meta: {
                    title: '数字对象申请'
                },
                component: () => import('@/views/DigitalObjectApply')
            },
            {
                path: '/DigitalObjectApproval',
                name: 'DigitalObjectApproval',
                meta: {
                    title: '数字对象审批'
                },
                component: () => import('@/views/DigitalObjectApproval')
            },
            {
                path: '/DigitalObjectSearch',
                name: 'DigitalObjectSearch',
                meta: {
                    title: '数字对象检索'
                },
                component: () => import('@/views/DigitalObjectSearch')
            },
            {
                path: '/DigitalObjectFerry',
                name: 'DigitalObjectFerry',
                meta: {
                    title: '数字对象摆渡'
                },
                component: () => import('@/views/DigitalObjectFerry')
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router