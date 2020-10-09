import Vue from "vue";
import App from "./App.vue";
import store from "./store";


// 导入 Element_ui
import "./plugins/element.js";
// 导入 Element-ui 样式
import "element-ui/lib/theme-chalk/index.css";

// 导入全局初始化样式
import "./assets/index.css";
import "./assets/icon/iconfont.css";

import router from "./router";

import filters from "./common/filter";

Vue.config.productionTip = false;

filters(Vue); //使用filter

let vue = new Vue({
    render: h => h(App),
    // 挂载到Vue示例上
    router,
    store
}).$mount("#app");

export default vue;
