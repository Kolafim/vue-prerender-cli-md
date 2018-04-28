<template>
  <div class="main-menu" >
    <transition
      enter-active-class="animated short ease-out opacity-on"
      leave-active-class="animated short ease-out opacity-off"
    >
      <div v-if="show" class="panel-bg" @click.stop="close"></div>
    </transition>
    <i class="open-btn" :class="{open:show}" @click.self="show?close():showMainMenu()"></i>

    <mu-popup position="top" :overlay="false" popupClass="main-menu-panel" :open="show">
      <div class="m-m-cell">
        <div class="m-m-flex flex">
          <div class="m-m-col-primary">
            <router-link class="m-m-logo-cell" :to="{name:'home'}" @click.native="close">
              <div class="m-m-logo"></div>
              <p class="m-m-home fantasy" >HOME</p>
            </router-link>
            <mu-list class="m-m-page-list" @itemClick="close">
              <!-- <mu-list-item title="HOME" :to="{name:'home'}"/> -->
              <transition-group name="list-opacity" tag="div" v-on:before-enter="beforeEnter">
                <mu-list-item v-if="item_show" key="m1" data-index="1" title="About" :to="{name:'about'}" @click.native="close"/>
                <mu-list-item v-if="item_show" key="m2" data-index="2" title="Contact" :to="{name:'contact'}" @click.native="close"/>
                <mu-divider v-if="item_show" key="m3" data-index="3" />
                <mu-list-item v-if="item_show" key="m4" data-index="4" title="Material Icons" :to="{name:'Material Icons'}" @click.native="close"/>
                <mu-list-item v-if="item_show" key="m5" data-index="5" title="Markdown Editor" :to="{name:'Markdown Editor'}" @click.native="close"/>
              </transition-group>

            </mu-list>
          </div>

          <div class="m-m-col-other">

          </div>
        </div>
      </div>
    </mu-popup>

  </div>
</template>

<script>
  // import {mapState} from 'vuex'
  export default {
    data(){
      return {
        show:false,
        item_show:false
      }
    },
    created(){
      // console.log(this.$route)
    },
    methods:{
      showMainMenu(){
        this.show = true;
      },
      close(){
        this.show = false;
      },
      beforeEnter(el){
        // console.log([el]);
        if(el.dataset && 'undefined' != el.dataset.index)
          el.style.cssText = `transition-delay:${el.dataset.index*0.15}s;`;
      }
    },
    watch:{
      show(b){
        if(b){
          setTimeout(()=>{
            this.item_show = b;
          },1);
        }else{
          this.item_show = b;
        }

      }
    }
    // computed:mapState(['modal'])
  }
</script>

<style lang="scss">
  @import '../../assets/css/theme.scss';

  .main-menu {
    .panel-bg {
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index: 1000;
      background-color: rgba(0,0,0,.15)
    }

    i.open-btn {
      display: block;
      position: fixed;
      right: 7%;
      top: 10px;
      z-index: 1002;
      padding: 5px;
      width: 40px;
      height: 40px;

      &:after, &:before {
        content: "";
        position: absolute;
        top: 16px;
        left: 10px;
        width: 20px;
        height: 2px;
        background: #000;
        -webkit-transition: -webkit-transform .3s ease-out;
        transition: -webkit-transform .3s ease-out;
        transition: transform .3s ease-out;
        transition: transform .3s ease-out,-webkit-transform .3s ease-out;
      }
      &:after {
        top: auto;
        bottom: 16px;
      }

      &.open:before {
        -webkit-transform: translateY(3px) rotate(135deg);
        transform: translateY(3px) rotate(135deg);
      }
      &.open:after {
        -webkit-transform: translateY(-3px) rotate(45deg);
        transform: translateY(-3px) rotate(45deg);
      }
    }

  }
  .main-menu-panel{
    width:100%;
    z-index: 1001 !important;

    .m-m-cell {
      margin:auto;

      .m-m-flex {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        margin-left: -15px;
        margin-right: -15px;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;

        .m-m-col-primary {

          .m-m-logo-cell {
            display: block;
            margin:15px 0;

            .m-m-logo {
              width:56px;
              height:56px;
              background: url(../../assets/images/emo.jpg) no-repeat center / contain;
              display: inline-block;
              vertical-align: bottom;
            }
            .m-m-home {
              display: inline-block;
              vertical-align: bottom;
              line-height: 1em;
              font-size: 20px;
              color:#000;
            }
          }

          .m-m-page-list {
            margin-bottom: 15px;
            margin-left:10px;

            .mu-item-wrapper {
              border-radius: 50px;
              overflow: hidden;

              .mu-item {
                width:200px;
                padding-left:52px;
              }

              .mu-item-title {
                font-size: 14px;
                color:#222;

              }

              &.router-link-active .mu-item-title {
                color:$theme-light;
              }
            }

          }
        }
      }
    }


    @media (min-width: 1080px){
      .m-m-cell {
        padding-left: 70px;
        padding-right: 70px;
        max-width: 1430px;
      }
    }
    @media (min-width: 720px){
      .m-m-cell {
        padding-left: 50px;
        padding-right: 50px;
        max-width: 1390px;
      }
    }
    @media (min-width: 480px){
      .m-m-cell {
        max-width: 1350px;
      }
    }
  }




</style>
