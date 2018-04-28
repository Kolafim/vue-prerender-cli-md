<template>
  <div id="app" :class="{screen:$route.meta.screen}">
    <!-- <img src="./assets/images/logo.png"> -->
    <!-- <h1 class="gray">{{ msg }}</h1> -->
    <!-- <p>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/material-icons">Material Icons</router-link>
    </p> -->
    <main-menu />
    <router-view/>
    <modal-panel/>
    <toast-panel/>
  </div>
</template>

<script>
import mainMenu from './components/global/mainMenu'
import toastPanel from './components/global/toastPanel'
import modalPanel from './components/global/modalPanel'
export default {
  data () {
    return {
      msg: 'Welcome to your prerender-spa-plugin Vuejs 2.0 demo app!'
    }
  },
  computeds:{
    
  },
  components:{
    mainMenu,
    toastPanel,
    modalPanel
  }
}
</script>

<style lang="scss">
@import './assets/css/common.css';
@import './assets/css/animate.css';
@import './assets/css/theme.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $theme-text-1;
  // padding-top: 60px;

  &.screen {
    height:100%;
  }

  a {
    color: $theme-light;
  }
}

// @media (min-width: 1440px) {
//   body{
//     overflow-y: scroll !important;
//   }
// }
</style>
