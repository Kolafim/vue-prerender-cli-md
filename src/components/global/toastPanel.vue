<template>
  <div class="toast" >
    <!-- <button @click="show">show toast</button> -->
    <!-- <transition
      enter-active-class="animated short ease-out opacity-on"
      leave-active-class="animated short ease-out opacity-off"
    >
      <div v-if="modal.toast.show" class="panel-bg"></div>
    </transition> -->
    <transition
      enter-active-class="animated short ease-out zoomIn"
      leave-active-class="animated short ease-out zoomOut"
    >
      <div v-if="modal.toast && modal.toast.show" class="toast-panel">
        <div class="h100 flex flex-line" @click.self="close">
          <div class="toast-main" >
            <div class="toast-icon">
              <mu-circular-progress v-if="modal.toast.type=='loading'" :size="50" color="#fff" />
              <i v-if="modal.toast.type=='err'" class="material-icons">&#xe001;</i>
            </div>
            <p class="toast-text">{{ modal.toast.msg }}</p>
            <!-- <div><button @click="close">关闭</button></div> -->
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    created(){
      // console.log(this.modal)
    },
    methods:{
      show(){
        this.$store.commit('LOADING_SHOW')
        // this.$store.commit('TOAST_SHOW',{msg:'ggggg',type:'loading'})
      },
      close(){
        this.$store.commit('TOAST_HIDE');
      },
    },
    computed:mapState(['modal'])
  }
</script>

<style lang="scss" scoped>
  // @import '../../assets/css/theme.scss';

  .toast-panel{
    position:fixed;
    left:0;
    top:0;
    z-index: 1002;
    width:100%;
    height:100%;

    .toast-main{
      padding: 40px 20px;
      // padding: 5vw 20px;
      background-color: #344c458a;
      border-radius: 14px;
      max-width: 50%;

      .toast-icon {
        margin-bottom: 10px;

        i {
          display: block;
          font-size:60px;
          color:#fff;
          font-weight: 200;
        }
      }
      .toast-text{
        min-width:120px;
        max-width: 180px;
        color:#fff;
        font-size: 16px;
      }
    }
  }
</style>
