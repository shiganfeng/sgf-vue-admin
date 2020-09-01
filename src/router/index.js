import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Layout from "../views/Layout/index.vue"

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const routes = [{
        path: "/",
        redirect: "login",
        hidden: true,
        meta: {
            name: "主页"
        }
    },
    {
        path: "/login",
        name: "Login",
        hidden: true,
        //要用箭头函数
        component: () =>
            import ("../views/Login/index2.0.vue"),
        meta: {
            name: "登录"
        }
    },
    {
        path: "/test",
        name: "Test",
        hidden: true,
        //要用箭头函数
        component: () =>
            import ("../views/test/test.vue"),
        meta: {
            name: "测试"
        }
    },
    {
        path: "/console",
        name: "Console",
        redirect: 'index',
        meta: {
            name: "控制台",
            icon: "console"
        },
        //要用箭头函数
        component: Layout,
        children: [{
            path: "/index",
            name: "首页",
            //要用箭头函数
            component: () =>
                import ("../views/Console/index.vue"),
            meta: {
                name: "首页"
            }
        }]
    },
    {
        path: "/info",
        name: "Info",
        meta: {
            name: "信息管理",
            icon: "info"
        },
        //要用箭头函数
        component: Layout,
        children: [{
                path: "/infoIndex",
                name: "信息列表",
                //要用箭头函数
                component: () =>
                    import ("../views/Info/index.vue"),
                meta: {
                    name: "信息列表"
                }
            },
            {
                path: "/infoCategory",
                name: "信息分类",
                //要用箭头函数
                component: () =>
                    import ("../views/Info/category.vue"),
                meta: {
                    name: "信息分类"
                }
            },
            {
                path: "/infoDetailed",
                name: "信息详情",
                hidden: true,
                //要用箭头函数
                component: () =>
                    import ("../views/Info/detailed.vue"),
                meta: {
                    name: "信息详情"
                }
            }
        ]
    },
    {
        path: "/user",
        name: "User",
        meta: {
            name: "用户管理",
            icon: "user"
        },
        //要用箭头函数
        component: Layout,
        children: [{
            path: "/userIndex",
            name: "用户列表",
            //要用箭头函数
            component: () =>
                import ("../views/User/index.vue"),
            meta: {
                name: "用户列表"
            }
        }]
    },
];

const router = new VueRouter({
    routes
});

export default router;