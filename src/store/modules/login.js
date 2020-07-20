import { Login } from "../../api/login.js";

const state = {}

const getters = {

}

const mutations = { //同步，不需要回调处理事情
}

const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            //接口
            Login(requestData).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
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