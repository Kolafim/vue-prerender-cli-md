import commonMutations from '../mutations/common.js'
// import commonActions from '../actions/common.js'
// import commonGetters from '../getters/common.js'

const common = {
  state: {
    count:0,
    refresh: {
        isShow: false
    }

  },
  mutations: commonMutations
  // actions: commonActions,
  // getters: commonGetters
}

export default common
