import router from "./index.js";
import store from "../store/index.js";
import { getToken, removeToken, removeUserName } from "../utils/app.js";

const whiteRouter = ['/login'];

//路由守卫
router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            removeToken()
            removeUserName()
            store.commit("app/SET_TOKEN", '')
            store.commit("app/SET_USERNAME", '')
            next()
        } else {
            //获取用户角色
            //动态路由分配
            if (store.getters['permission/roles'].length == 0) {
                store.dispatch('permission/getRoles').then(response => {
                    let role = response
                    store.dispatch('permission/createRouter', role).then(response => {
                        let addRouters = store.getters['permission/addRouters']
                        let allRouters = store.getters['permission/allRouters']
                            //路由更新
                        router.options.routes = allRouters
                            //添加动态路由
                        router.addRoutes(addRouters)
                        next({...to, replace: true })
                            //es6扩展运算符，防止内容发生变化的情况
                            //不被记录历史记录
                            ////
                    })
                })
            } else {
                next()
            }
        }
        // console.log('存在')
    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }

        // console.log('不存在')
    }
    // console.log(to)
    // next()
})