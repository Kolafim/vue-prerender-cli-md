import Vue from 'vue'
import Router from 'vue-router'
// import MetaInfo from 'vue-meta-info'
import Home from '@/pages/home'
import About from '@/pages/about'
import Contact from '@/pages/contact'
import materialIcons from '@/pages/material-icons'
import markdownEditor from '@/pages/markdown-editor'

Vue.use(Router)
// Vue.use(MetaInfo)

console.log(process.env);

const BASE_TITLE = document.title;

const router = new Router({
  base: process.env.NODE_BASE_URL || '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'home',
      component: Home
    },
    {
      path: '/about',
      name:'about',
      component: About,
      meta:{title:'About'}
    },
    {
      path: '/contact',
      name:'contact',
      component: Contact,
      meta:{title:'Contact'}
    },
    {
      path:'/material-icons',
      name:'Material Icons',
      component: materialIcons,
      meta:{title:'Material Icons'}
    },
    {
      path:'/markdown-editor',
      name:'Markdown Editor',
      component: markdownEditor,
      meta:{title:'Markdown Editor',screen:1}
    }
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = `${to.meta.title} - ${BASE_TITLE}`
  }else if(BASE_TITLE != document.title){
    document.title = BASE_TITLE
  }
  next()
})
export default router
