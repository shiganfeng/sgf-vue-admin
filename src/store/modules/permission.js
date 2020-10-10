import { GetSystemRole } from "../../api/user.js"
import { defaultRouterMap, asyncRouterMap } from "../../router/index.js"

const state = {
    roles: [],
    allRouters: defaultRouterMap,
    addRouters: []
}

const getters = {
    roles: state => state.roles,
    allRouters: state => state.allRouters, //所有的
    addRouters: state => state.addRouters //匹配的
}

const mutations = { //同步，不需要回调处理事情
    SET_ROLES(state, value) {
        state.roles = value
    },
    SET_ROUTER(state, value) {
        state.addRouters = value
        state.allRouters = defaultRouterMap.concat(value)
    }
}

const actions = {
    //获取用户角色
    getRoles({ commit }) {
        return new Promise((resolve, reject) => {
            //接口
            GetSystemRole().then((response) => {
                let role = response.data.data.role
                commit('SET_ROLES', role)
                resolve(role)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    //创建动态路由
    createRouter({ commit }, data) {
        return new Promise((resolve, reject) => {
            //["信息功能", "用户功能"]
            let role = data
            console.log(data)
            let addRouters = []
            if (role.includes('admin')) {
                //超级管理员
                addRouters = asyncRouterMap
            } else {
                //普通管理员
                addRouters = asyncRouterMap.filter(item => {
                    if (role.includes(item.meta.system)) {
                        return item
                    }
                })
                addRouters.push(asyncRouterMap[asyncRouterMap.length - 1])
            }
            //更新路由
            commit('SET_ROUTER', addRouters)
            resolve()
        })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};