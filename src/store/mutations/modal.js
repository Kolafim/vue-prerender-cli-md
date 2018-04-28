import * as types from '../mutation-types.js'

//mutations

export default {
  [types.TOAST_SHOW](state, {type='text',msg='',theme=0}={}) {
    // console.log([type,msg,theme]);
    if(type=='text'){
      if(msg == '') return;
    }else if(type=='loading'){
      if(msg == '') msg = 'Loading..'
    }else if(type == 'err'){
      if(msg == '') msg = 'Error'
    }
    state.toast = {
      show:true,
      type,
      msg,
      theme
    }
  },
  [types.TOAST_HIDE](state) {
    state.toast.show = false
  },
  [types.LOADING_SHOW](state, {type='loading',msg='',theme=0}={}) {
    this.commit('TOAST_SHOW',{type,msg,theme});
  },
  [types.MODAL_SHOW](state, {title='',msg='',theme=0}={}) {
    if(msg == '') {
      console.log('MODAL_SHOW msg为空');
      return;
    }
    state.modal = {
      show:true,
      title,
      msg,
      theme,
      type:1
    }
  },
  [types.MODAL_HIDE](state) {
    state.modal.show = false
  },
  [types.ALERT_SHOW](state, {title='',msg='',theme=0}={}) {
    if(msg == '') {
      console.log('ALERT_SHOW msg为空');
      return;
    }
    state.modal = {
      show:true,
      title,
      msg,
      theme,
      type:0
    }
  },
  [types.ALERT_HIDE](state) {
    state.modal.show = false
  }
}
