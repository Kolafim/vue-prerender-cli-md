// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* vuex */
import store from './store'

/* muse */
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'// 使用 teal 主题, 预设4种主题：light, dark, carbon, teal
Vue.use(MuseUI)

/* material-design-icons */
import 'material-design-icons/iconfont/material-icons.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
