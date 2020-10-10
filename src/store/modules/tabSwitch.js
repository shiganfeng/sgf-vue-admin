const state = {
    openTab: JSON.parse(localStorage.getItem('tabSwitch')) || [{ "route": "/index", "name": "首页" }], //所有打开的路由
    activeIndex: localStorage.getItem('activtIndex') || '/index' //激活状态
}

const getters = {

}

const mutations = { //同步，不需要回调处理事情
    // 添加tabs
    add_tabs(state, data) {
        console.log(data)
        state.openTab.push(data);
    },
    // 删除tabs
    delete_tabs(state, route) {
        let index = 0;
        for (let option of state.openTab) {
            if (option.route === route) {
                break;
            }
            index++;
        }
        state.openTab.splice(index, 1);
        localStorage.setItem('tabSwitch', JSON.stringify(this.openTab))
    },
    // 设置当前激活的tab
    set_active_index(state, index) {
        state.activeIndex = index;
        localStorage.setItem('activeIndex', state.activeIndex)
    },
}

const actions = {

}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};