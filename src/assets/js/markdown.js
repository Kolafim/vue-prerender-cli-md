// import hljsLangs from '../hljs/lang.hljs.js'
// import { loadScript } from './extra.js'
import hljs from './highlight.min.js'
// let hljs = require('../highlightjs/highlight.min.js');

// function escape(html, encode) {
//   return html
//     .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&#39;');
// }

var markdown_config = {
    html: true,        // Enable HTML tags in source
    xhtmlOut: true,        // Use '/' to close single tags (<br />).
    breaks: true,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'lang-',  // CSS language prefix for fenced blocks. Can be
    linkify: false,        // 自动识别url
    typographer: true,
    quotes: '“”‘’',
    // highlight: function (str, lang) {
    //     // if (lang && hljsLangs[lang]) {
    //     //     return '<pre><div class="hljs2"><code class="' + lang + '">' + markdown.utils.escapeHtml(str) + '</code></div></pre>';
    //     // }
    //     return '<pre><code class="' + lang + '">' + markdown.utils.escapeHtml(str) + '</code></pre>';
    // }
    // highlight: function (str, lang) {
    //     console.log(1111);
    //     console.log(str);
    //
    //     // if (!lang) {
    //     //   return '<pre><code>'
    //     //     + (escaped ? code : escape(code, true))
    //     //     + '\n</code></pre>';
    //     // }
    //     return hljs.highlightAuto(str).value;
    //     // if (lang && hljs.getLanguage(lang)) {
    //     //   try {
    //     //     return hljs.highlight(lang, str).value;
    //     //   } catch (__) {}
    //     // }
    //     // return ''; // use external default escaping
    // }
}
var markdown = require('markdown-it')(markdown_config);
// 表情
var emoji = require('markdown-it-emoji');
// mark
var mark = require('markdown-it-mark');
//布局
// var container = require('markdown-it-container');
// insert 带有下划线 样式 ++ ++
var insert = require('markdown-it-ins');
var mihe = require('markdown-it-highlightjs-external');

// 下标
// var sub = require('markdown-it-sub')
// 上标
// var sup = require('markdown-it-sup')
// <dl/>
// var deflist = require('markdown-it-deflist')
// <abbr/>
// var abbr = require('markdown-it-abbr')
// footnote
// var footnote = require('markdown-it-footnote')

// add target="_blank" to all link
var defaultRender = markdown.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
};
markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // If you are sure other plugins can't add `target` - drop check below
    var aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']); // add new attribute
    } else {
        tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
};
// math katex
// var katex = require('markdown-it-katex-external');
// var miip = require('markdown-it-images-preview');
var missLangs = {};
var needLangs = [];
var hljs_opts = {
    hljs: 'auto',
    highlighted: true,
    // langCheck: function(lang) {
    //     if (lang && hljsLangs[lang] && !missLangs[lang]) {
    //         missLangs[lang] = 1;
    //         console.log(lang);
    //         needLangs.push(lang)
    //     }
    // }
};
markdown.use(mihe, hljs_opts)
    .use(emoji)
    // .use(sup)
    // .use(sub)
    // .use(container)
    // .use(container, 'hljs-left') /* align left */
    // .use(container, 'hljs-center')/* align center */
    // .use(container, 'hljs-right')/* align right */
    // .use(deflist)
    // .use(abbr)
    // .use(footnote)
    .use(insert)
    .use(mark)
    // .use(miip)
    // .use(katex)

export default {
    data() {
        return {
            s_markdown: markdown,
        }
    },
    // mounted() {
    //     var $vm = this;
    //     hljs_opts.highlighted = this.ishljs;
    // },
    methods: {
        $render(src, func) {
            var $vm = this;
            missLangs = {};
            needLangs = [];
            var res = markdown.render(src);
            // if (this.ishljs) {
            //     if (needLangs.length > 0) {
            //         $vm.$_render(src, func, res);
            //     }
            // }
            func(res);
        },
        // $_render(src, func, res) {
        //     var $vm = this;
        //     var deal = 0;
        //     for (var i = 0; i < needLangs.length; i++) {
        //         var url = $vm.p_external_link.hljs_lang(needLangs[i]);
        //         loadScript(url, function() {
        //             deal = deal + 1;
        //             if (deal === needLangs.length) {
        //                 res = markdown.render(src);
        //                 func(res);
        //             }
        //         })
        //     }
        // }
    },
    watch: {
        // ishljs: function(val) {
        //     hljs_opts.highlighted = val;
        // }
    }
};
