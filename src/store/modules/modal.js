import modalMutations from '../mutations/modal.js'

export default {
  state: {
    toast:{
      show:false,
      type:0,         // text  loading  err
      msg:'',
      theme:0
    },
    modal:{
      show:false,
      title:'',
      msg:'',
      theme:0,
    },
    top:{
      show:false,
      msg:''
    }
  },
  mutations: modalMutations
}
