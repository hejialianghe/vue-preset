import axios from "./axios";
import api from "./api";
import statistics from "./statistics";
global.ajax = axios;

export default {
  install: (Vue, options) => {
    // 需要挂载的都放在这里
    Vue.prototype.$api = api;
    Vue.prototype.$tj = statistics;
  }
};
