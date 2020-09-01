import { setToken, setUserName, getUserName, removeToken, removeUserName } from "../../utils/app.js";
import { Login } from "../../api/login.js";

const state = {
    id: '',
    title: ''
}

const getters = {}

const mutations = { //同步，不需要回调处理事情
    SET_ID(state, value) {
        state.id = value
    },
    SET_TITLE(state, value) {
        state.title = value
    }
}

const actions = {}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};