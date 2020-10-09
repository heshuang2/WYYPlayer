import Vue from "vue";
import axios from "axios";
// import  VueResource  from 'vue-resource'
// 导入进度条插件
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

axios.defaults.baseURL = "https://autumnfish.cn/";
/// 设置请求拦截器和响应拦截器
axios.interceptors.request.use(config => {
    // 展示进度条
    Nprogress.start();
    // 在最后必须return config
    return config;
});

// 在响应拦截器中隐藏进度条
axios.interceptors.response.use(response => {
    // 隐藏进度条
    Nprogress.done();
    // 在最后必须return response
    return response;
});

// 将导入的 axios，挂载到Vue的原型对象上，这样所有 vue 的实例都可以使用
Vue.prototype.$http = axios;
