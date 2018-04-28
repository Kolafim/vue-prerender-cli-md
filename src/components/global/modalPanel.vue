<template>
  <div class="modal" :class="{['theme-'+modal.modal.theme]:modal.modal.theme}">
    <!-- <mu-raised-button label="show modal" @click="show" /> -->

    <mu-dialog :open="modal.modal.show" :title="modal.modal.title" @close="close">
      {{ modal.modal.msg }}
      <mu-flat-button v-if="modal.modal.type" slot="actions" @click="close" label="取消"/>
      <mu-flat-button slot="actions" @click="close" label="确定" primary/>
    </mu-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    created(){

    },
    methods:{
      show(){
        let _data = {msg:'这是简单的弹出框',title:'提示'};
        this.$store.commit('MODAL_SHOW',_data);
      },
      close(){
        this.$store.commit('MODAL_HIDE');
      }
    },
    computed:mapState(['modal'])
  }
</script>

<style scoped>

</style>
