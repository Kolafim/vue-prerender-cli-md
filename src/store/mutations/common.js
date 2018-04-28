import * as types from '../mutation-types.js'

//mutations

export default {
    // ----- refresh
    [types.SHOW_REFRESH](state) {
        state.refresh.isShow = true
    },
    [types.HIDE_REFRESH](state) {
        state.refresh.isShow = false
    },
    [types.ADD_COUNT](state){
      state.count+=10
    }
}
