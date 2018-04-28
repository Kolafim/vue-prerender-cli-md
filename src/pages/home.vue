
<template>
  <div class="hello">
    <h2 class="page-head-name">{{ msg }}</h2>
    <div class="flex">
      <div>
        <h4>store: {{common.count}} / {{animat_store_count}}</h4>
        <div><button @click="addCount">+10</button></div>
      </div>
      <div>
        <h4>local: {{count}}</h4>
        <div><button @click="addCountLocal">+10</button></div>
      </div>
    </div>


    <div class="flex">
      <mu-raised-button label="顶部消息" @click="openTop" />
      <mu-raised-button label="show modal" @click="openModal" />
      <mu-raised-button label="show toast" @click="openToast" />
    </div>
    <mu-popup position="top" :overlay="false" popupClass="msg-popup-top" :open="topPopup">
      顶部消息
    </mu-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      msg: 'Home Page',
      count:0,
      topPopup:false,
      topPopupTimer:0
    }
  },
  created () {
    // 初始化第一组数据；
    // console.log(this);
  },
  methods:{
    openToast(){
      // this.$store.commit('TOAST_SHOW',{msg:'ggggg',type:'err'})
      this.$store.commit('LOADING_SHOW')
    },
    openModal(){
      this.$store.commit('MODAL_SHOW',{msg:'这是简单的弹出框',title:'提示'});
      // this.$store.commit('ALERT_SHOW',{msg:'这是简单的弹出框',title:'提示'});
    },
    openTop () {
      this.topPopup = true;
      if(this.topPopupTimer) clearTimeout(this.topPopupTimer);
      this.topPopupTimer = setTimeout(()=>{
        this.topPopup = false;
      },2000)
    },
    addCount(e){
      this.$store.commit('ADD_COUNT');
    },
    addCountLocal(e){
      this.count += 10;
    }
  },
  computed:{
    ...mapState({
      common:'common',
    }),
    animat_store_count(){
      return this.common.count//this.tweenedNumber.toFixed(0)//this.common.count
    }
  },
  watch: {
    // 'common.count': function(newValue) {
    //   console.log(newValue,this);
    //   // TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue });
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello{
    h4 {
      color:#777;
    }
  }
</style>
