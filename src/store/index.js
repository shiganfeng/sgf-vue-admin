import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app.js";
import login from "./modules/login.js";
import infoDetailed from "./modules/infoDetailed.js"
import tabSwitch from "./modules/tabSwitch.js"
import permission from "./modules/permission.js"

export default new Vuex.Store({
    modules: {
        app,
        login,
        infoDetailed,
        tabSwitch,
        permission
    }
});