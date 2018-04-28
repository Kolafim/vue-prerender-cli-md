/**
 *  Vuex 依赖 Promise
 *  如果你支持的浏览器并没有实现 Promise (比如 IE)，那么你可以使用一个 polyfill 的库
 *  例如 es6-promise: https://github.com/stefanpenner/es6-promise
 */

import Vue from 'vue'
// import 'es6-promise/auto'
import Vuex from 'vuex'
Vue.use(Vuex)

import common from './modules/common'
import modal from './modules/modal'

const store = new Vuex.Store({
    modules: {
        common,
        modal,
        tool:{
          state:{
            initAvatar:function(_url){
              return _url.replace(/^\/\/(.+)/,'http://$1');
            }
          }
        }
    },
    strict: process.env.NODE_ENV !== 'production'
})

export default store
