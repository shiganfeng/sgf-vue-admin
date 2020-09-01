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
            next()
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