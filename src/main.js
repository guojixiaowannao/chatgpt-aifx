import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import { copyToClipboard } from '@/util/util'
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(ElementUI);

/**
 * 复制
 */

Vue.prototype.$copy = function (value, mes) {
  if (copyToClipboard(value)) {
    this.$message.success(mes)
  }
}
// 定义全局路由导航守卫，动态更新页面标题
router.beforeEach((to, from, next) => {
  // 如果meta对象里有title属性，则修改页面标题为该title值
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


