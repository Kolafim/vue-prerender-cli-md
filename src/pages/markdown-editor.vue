<template>
  <div class="markdown-editor flex flex-v">
    <h2 class="page-head-name">{{ msg }}</h2>
    <!-- <mavon-editor v-model="value" :ishljs="true" :externalLink="externalLink"/> -->
    <!-- @childevent="childEventHandler" -->
    <markdown
    :value="md_value"
    :fullPageStatusP="false"
    :editStatusP="true"
    :previewStatusP="true"
    :navStatusP="true"
    :icoStatusP="true"
    ></markdown>
    <div class="m-e-footer">
      <p><i class="material-icons">&#xe86b;</i><span>description</span></p>
    </div>
  </div>
</template>

<script>
/* mavonEditor */
// let mavonEditor = require('mavon-editor')

// let mavonEditor = require('../components/vue-mavon-editor/index')
// console.log(mavonEditor);
// import mavonEditor from 'mavon-editor'
import markdown from '../components/markdown'
// import 'mavon-editor/dist/css/index.css'

export default {
  data () {
    return {
      msg: 'Markdown Editor',
      value:'',
      md_value:'```javascript\nfunction aaa(){}\n```\n',
      externalLink: {
        markdown_css: function() {
          //return '../css/github-markdown.min.css';
          return false;
        },
        hljs_js: function() {
          return process.env.NODE_BASE_URL+'static/highlightjs/highlight.min.js';
        },
        hljs_css: function(css) {
          return process.env.NODE_BASE_URL+'static/highlightjs/styles/' + css + '.min.css';
        },
        hljs_lang: function(lang) {
          return process.env.NODE_BASE_URL+'static/highlightjs/languages/' + lang + '.min.js';
        },
        katex_css: function() {
          return process.env.NODE_BASE_URL+'static/katex/katex.min.css';
        },
        katex_js: function() {
          return process.env.NODE_BASE_URL+'static/katex/katex.min.js';
        },
      }
    }
  },
  created(){
    // console.log(mavonEditor);
  },
  computed:{

  },
  components:{
    markdown
  }
}
</script>

<style lang="scss">
  .markdown-editor{
    height:100%;
    background-color: #f1f1f1;

    .v-note-wrapper {
      z-index:0;
      flex: 1;

      [type=button]{
        -webkit-appearance:none;
      }

      .v-note-op, & .v-note-panel {
        border-bottom: 1px solid #e3e3e3;
        box-shadow:none;

        .v-right-item {
         max-width: 270px;
       }
      }
    }

    .m-e-footer {
      font-size: 13px;
      color:#aaa;
      padding:.5em;

      i,span {
        vertical-align: middle;
        line-height: 1em;
        margin:0 .1em
      }

      i{
        font-size: 16px;
      }
    }
  }
</style>
