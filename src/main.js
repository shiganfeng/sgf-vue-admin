import Vue from "vue";
import VueCompositionApi from '@vue/composition-api';
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import global from "./utils/global.js"
//路由守卫
import './router/premit.js'
//自定义全局组件
import './icons/index.js'

Vue.use(ElementUI)
Vue.use(VueCompositionApi);
Vue.use(global)
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");