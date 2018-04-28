<template>
    <div class="v-note-wrapper markdown-body" :class="{ fullPage: fullPageStatus }">
        <!-- <div class="navContainer" v-if="navStatus">
            <div class="nameContainer" v-if="icoStatusP" @click="happyDay">OVEN-mdEditor</div>
            <div class="markContainer">
                <ul class="markListGroup">
                    <li class="markListItem" @click="addStrong" title="strong"><b>B</b></li>
                    <li class="markListItem" @click="addItalic" title="italic"><i>I</i></li>
                    <li class="markListItem" @click="addStrikethrough" title="strikethrough"><i class="fa fa-strikethrough" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="addHTitle(1)" title="H1-title">H1</li>
                    <li class="markListItem" @click="addHTitle(2)" title="H2-title">H2</li>
                    <li class="markListItem" @click="addHTitle(3)" title="H3-title">H3</li>
                    <li class="markListItem" @click="addHTitle(4)" title="H4-title">H4</li>
                    <li class="markListItem" @click="addHTitle(5)" title="H5-title">H5</li>
                    <li class="markListItem" @click="addHTitle(6)" title="H6-title">H6</li>
                    <li class="markListItem" @click="addLine" title="line">一</li>
                    <li class="markListItem" @click="addQuote" title="quote"><i class="fa fa-quote-left" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="addCode"><i class="fa fa-code" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="addLink"><i class="fa fa-link" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="addImage"><i class="fa fa-picture-o" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="addTable" title="table"><i class="fa fa-table" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="addUl" title="ul-list"><i class="fa fa-list-ul" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="addOl" title="ol-list"><i class="fa fa-list-ol" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="fullPageFn" title="fullpage"><i class="fa fa-arrows-alt" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="previewFn" title="preview"><i class="fa fa-eye-slash" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="previewAllFn" title="previewAll"><i class="fa fa-eye" aria-hidden="true"></i></li>

                    <li class="markListItem" @click="showHelp" title="showHelp"><i class="fa fa-book" aria-hidden="true"></i></li>
                </ul>

            </div>
        </div> -->
        <!--工具栏-->
        <div class="v-note-op" v-show="true">
            <md-toolbar-left ref="toolbar_left" :editable="editable" :d_words="d_words"
                               @toolbar_left_click="toolbar_left_click" @toolbar_left_addlink="toolbar_left_addlink" :toolbars="toolbars"
                               @imgAdd="$imgAdd"/>
            <md-toolbar-right ref="toolbar_right" :d_words="d_words" @toolbar_right_click="toolbar_right_click"
                                :toolbars="toolbars"
                                :s_subfield="s_subfield"
                                :s_preview_switch="s_preview_switch"
                                :s_html_code="s_html_code"/>
        </div>
        <!--编辑展示区域-->
        <div class="v-note-panel">
            <!--编辑区-->
            <div ref="vNoteEdit" @scroll="$v_edit_scroll" class="v-note-edit divarea-wrapper scroll-style"
                 :class="{'single-edit': !s_preview_switch && !s_html_code , 'single-show': (!s_subfield && s_preview_switch) || (!s_subfield && s_html_code)}"
                 @click="textAreaFocus">
                <div class="content-input-wrapper">
                    <!-- 双栏 -->
                    <v-autoTextarea ref="vNoteTextarea" class="content-input" fontSize="15px" lineHeight="1.5" v-model="d_value"></v-autoTextarea>
                </div>
            </div>
            <!--展示区-->
            <div :class="{'single-show': (!s_subfield && s_preview_switch) || (!s_subfield && s_html_code)}"
                 v-show="s_preview_switch || s_html_code" class="v-note-show">
                <div ref="vShowContent" v-html="d_render" v-show="!s_html_code" class="v-show-content scroll-style"></div>
                <div v-show="s_html_code" class="v-show-content-html scroll-style">
                    {{d_render}}
                </div>
            </div>
        </div>
        <!-- <div class="mdBodyContainer" :class="{ noMenu: !navStatus }">
            <div class="editContainer" v-if="editStatus" ref="vNoteEdit" @scroll="$v_edit_scroll">
                <v-autoTextarea ref="vNoteTextarea" class="content-input" lineHeight="1.5" v-model="d_value"></v-autoTextarea>
            </div>
            <div ref="vShowContent" class="previewContainer markdown-body" v-if="previewStatus" v-html="d_render"></div>
        </div> -->
        <!--帮助文档-->
        <transition name="fade">
            <div ref="help" v-if="s_help">
                <div @click="toolbar_right_click('help')" class="v-note-help-wrapper">
                    <div @click.stop="" class="v-note-help-content markdown-body">
                        <i @click.stop.prevent="toolbar_right_click('help')" class="fa fa-mavon-times"
                           aria-hidden="true"></i>
                        <div class="scroll-style v-note-help-show" v-html="d_help"></div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    // import Vue from 'vue'
    // import marked from 'marked'
    import autoTextarea from 'k-auto-textarea'
    // import scroll from 'vue-scroll'
    import {keydownListen} from '../assets/js/keydown-listen.js'
    import {scrollLink, insertTextAtCaret, insertTab} from '../assets/js/extra.js'
    import markdown from '../assets/js/markdown.js'
    import {CONFIG} from '../assets/js/config.js'
    // import hljs from '../../static/js/highlight.min.js'
    // import range from '../../static/js/rangeFn.js'
    // Vue.use(scroll)
    // marked.setOptions({
    //     renderer: new marked.Renderer(),
    //     gfm: true,
    //     tables: true,
    //     breaks: false,
    //     pedantic: false,
    //     sanitize: true,
    //     smartLists: true,
    //     smartypants: false,
    //     highlight: function(code) {
    //         return hljs.highlightAuto(code).value
    //     }
    // });
    // var s_md_toolbar_left = require('./components/s-md-toolbar-left.vue')
    // var s_md_toolbar_right = require('./components/s-md-toolbar-right.vue')
    import md_toolbar_left from './md-toolbar/md-toolbar-left.vue'
    import md_toolbar_right from './md-toolbar/md-toolbar-right.vue'
    import {toolbar_left_click, toolbar_left_addlink, toolbar_right_click} from '../assets/js/toolbar_click.js'

    function insertContent(val, that) {
        let textareaDom = document.querySelector('.mdEditor');
        let value = textareaDom.value;
        let point = range.getCursortPosition(textareaDom);
        let lastChart = value.substring(point - 1, point);
        let lastFourCharts = value.substring(point - 4, point);
        if (lastChart != '\n' && value != '' && lastFourCharts != '    ') {
            val = '\n' + val;
            range.insertAfterText(textareaDom, val);
        } else {
            range.insertAfterText(textareaDom, val);
        }
        that.input = document.querySelector('.mdEditor').value;
    }
    export default {
        mixins: [markdown],
        name: 'markdown',
        // props: ['mdValuesP', 'fullPageStatusP', 'editStatusP', 'previewStatusP', 'navStatusP', 'icoStatusP'],
        props:{
            // 初始value
            value: {
                type: String,
                default: ''
            },
            // 初始value
            language: {
                type: String,
                default: 'zh-CN'
            },
            // 是否开启编辑
            editable: {
                type: Boolean,
                default: true
            },
            // 工具栏
            toolbars: {
                type: Object,
                default() {
                    return CONFIG.toolbars
                }
            },
            subfield: {
                type: Boolean,
                default: true
            },
            defaultOpen: {
                type: String,
                default: null
            },
        },
        data() {
            return {
                d_value: '',// props 文本内容
                d_render: '',// props 文本内容render
                d_help: null,
                d_words: {},
                s_help:false,
                s_subfield: (() => {
                    return this.subfield;
                })(),
                s_preview_switch: (() => {
                    let default_open_ = this.defaultOpen;
                    if (!default_open_) {
                        default_open_ = this.subfield ? 'preview' : 'edit';
                    }
                    return default_open_ === 'preview' ? true : false;
                })(), // props true 展示编辑 false展示预览
                s_html_code: false,// 分栏情况下查看html

                input: this.mdValuesP || '',
                editStatus: Boolean(this.editStatusP),
                previewStatus: Boolean(this.previewStatusP),
                fullPageStatus: Boolean(this.fullPageStatusP),
                navStatus: Boolean(this.navStatusP),
                icoStatus: Boolean(this.icoStatusP),
                maxEditScrollHeight:0,
                maxPreviewScrollHeight:0,
                edit_scroll_height:-1
            }
        },
        created() {
            this.initLanguage();

            if (!this.editStatus && !this.previewStatus) {
                this.editStatus = true;
                this.previewStatus = true;
            }
        },
        mounted(){
          var $vm = this;
          this.$el.addEventListener('paste', function (e) {
              $vm.$paste(e);
          });
          this.$el.addEventListener('drop', function (e) {
              $vm.$drag(e);
          });
          keydownListen(this);
          this.d_value = this.value;
        },
        methods: {
            test(e){
                console.log(e);
            },
            initLanguage() {
                let lang = 'zh-CN';
                var $vm = this;
                $vm.$render(CONFIG[`help_${lang}`], function(res) {
                    $vm.d_help = res;
                })
                this.d_words = CONFIG[`words_${lang}`];
            },
            textAreaFocus() {
                this.$refs.vNoteTextarea.$refs.vTextarea.focus();
            },
            $imgAdd(pos, $file, isinsert) {
                if (isinsert === undefined) isinsert = true;
                var $vm = this;
                if (this.__rFilter == null) {
                    // this.__rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                    this.__rFilter = /^image\//i;
                }
                this.__oFReader = new FileReader();
                this.__oFReader.onload = function (oFREvent) {
                    $vm.s_markdown.image_add(pos, oFREvent.target.result);
                    $file.miniurl = oFREvent.target.result;
                    if (isinsert === true) {
                        // 去除特殊字符
                        $file._name = $file.name.replace(/[\[\]\(\)\+\{\}&\|\\\*^%$#@\-]/g, '');
                        $vm.insertText($vm.getTextareaDom(),
                            {
                                prefix: '\n![' + $file._name + '](' + pos + ')',
                                subfix: '',
                                str: ''
                            });
                        $vm.$nextTick(function () {
                            $vm.$emit('imgAdd', pos, $file);
                        })
                    }
                }
                if ($file) {
                    var oFile = $file;
                    if (this.__rFilter.test(oFile.type)) {
                        this.__oFReader.readAsDataURL(oFile);
                    }
                }
            },
            toolbar_left_click(_type) {
                toolbar_left_click(_type, this);
            },
            toolbar_left_addlink(_type, text, link) {
                toolbar_left_addlink(_type, text, link, this);
            },
            toolbar_right_click(_type) {
                toolbar_right_click(_type, this);
            },
            // 滚动条联动
            $v_edit_scroll($event) {
                scrollLink($event, this);
            },
            // 工具栏插入内容
            insertText(obj, {prefix, subfix, str}) {
                // if (this.s_preview_switch) {
                insertTextAtCaret(obj, {prefix, subfix, str}, this);
            },
            insertTab() {
                insertTab(this)
            },
            // 获取textarea dom节点
            getTextareaDom() {
                return this.$refs.vNoteTextarea.$refs.vTextarea;
            },

            showHelp(){
                this.s_help = true
            },
            tabFn: function(evt) {
                insertContent("    ", this);
                // 屏蔽屌tab切换事件
                if (evt.preventDefault) {
                    evt.preventDefault();
                } else {
                    evt.returnValue = false;
                }
            },
            addImage: function(evt) {
                insertContent("![Vue](https://cn.vuejs.org/images/logo.png)", this);
            },
            addHTitle: function(index) {
                let tmp = '';
                switch (index) {
                    case 1:
                        tmp = '# ';
                        break;
                    case 2:
                        tmp = '## ';
                        break;
                    case 3:
                        tmp = '### ';
                        break;
                    case 4:
                        tmp = '#### ';
                        break;
                    case 5:
                        tmp = '##### ';
                        break;
                    case 6:
                        tmp = '###### ';
                        break;
                    default:
                        break;
                }
                insertContent(tmp, this);
            },
            change(val, render) {
                this.$emit('change', val, render)
            },
            iRender() {
                var $vm = this;
                // console.log($vm.d_value);
                $vm.$render($vm.d_value, function(res) {
                    // render
                    $vm.d_render = res;
                    // change回调
                    // if ($vm.change) $vm.change($vm.d_value, $vm.d_render);
                    // 改变标题导航
                    // if ($vm.s_navigation) getNavigation($vm, false);
                    // v-model 语法糖
                    // $vm.$emit('input', $vm.d_value)
                    // 塞入编辑记录数组
                    // if ($vm.d_value === $vm.d_history[$vm.d_history_index]) return
                    // window.clearTimeout($vm.currentTimeout)
                    // $vm.currentTimeout = setTimeout(() => {
                    //     $vm.saveHistory();
                    // }, 500);
                })
            },
            addCode: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('```\n\n```', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 5);
                } else {
                    range.setCaretPosition(textareaDom, point + 4);
                }
            },
            addStrikethrough: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('~~~~', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 3);
                } else {
                    range.setCaretPosition(textareaDom, point + 2);
                }
            },
            addStrong: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('****', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 3);
                } else {
                    range.setCaretPosition(textareaDom, point + 2);
                }
            },
            addItalic: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('**', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 2);
                } else {
                    range.setCaretPosition(textareaDom, point + 1);
                }
            },
            setStrong: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let point = range.getCursortPosition(textareaDom);
            },
            addLine: function() {
                insertContent('\n----\n', this);
            },
            addLink: function() {
                insertContent("[Vue](https://cn.vuejs.org/images/logo.png)", this);
            },
            addQuote: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('> ', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 3);
                } else {
                    range.setCaretPosition(textareaDom, point + 2);
                }
            },
            addTable: function() {
                insertContent('\nheader 1 | header 2\n', this);
                insertContent('---|---\n', this);
                insertContent('row 1 col 1 | row 1 col 2\n', this);
                insertContent('row 2 col 1 | row 2 col 2\n\n', this);
            },
            addUl: function() {
                insertContent('* ', this);
            },
            addOl: function() {
                insertContent('1. ', this);
            },
            previewFn: function() {
                if (!this.editStatus) {
                    this.editStatus = true;
                    this.previewStatus = !this.previewStatus;
                } else {
                    this.previewStatus = !this.previewStatus;
                }
            },
            previewAllFn: function() {
                if (!this.editStatus && this.previewStatus) {
                    this.editStatus = true;
                    this.previewStatus = true;
                } else {
                    this.editStatus = false;
                    this.previewStatus = true;
                }
            },
            fullPageFn: function() {
                this.fullPageStatus = !this.fullPageStatus;
                let maxEditScrollHeight=document.querySelector('.mdEditor').scrollHeight-document.querySelector('.mdEditor').clientHeight;
                let maxPreviewScrollHeight=document.querySelector('.previewContainer').scrollHeight-document.querySelector('.previewContainer').clientHeight;
                this.maxEditScrollHeight = maxEditScrollHeight
                this.maxPreviewScrollHeight = maxPreviewScrollHeight
            },
            previewScroll: function(e, position) {
                if(this.maxEditScrollHeight!==0){
                    let topPercent=position.scrollTop/this.maxPreviewScrollHeight;
                    document.querySelector('.mdEditor').scrollTop = this.maxEditScrollHeight*topPercent;
                }
            },
            editScroll:function(e, position){
                if(this.maxPreviewScrollHeight!==0){
                    let topPercent=position.scrollTop/this.maxEditScrollHeight;
                    document.querySelector('.previewContainer').scrollTop = this.maxPreviewScrollHeight*topPercent;
                }
            },
            happyDay:function(){
                window.open('https://github.com/ovenslove/vue-mdEditor');
            },
            $drag($e) {
                var dataTransfer = $e.dataTransfer;
                if (dataTransfer) {
                    var files = dataTransfer.files;
                    if (files.length > 0) {
                        $e.preventDefault();
                        // this.$refs.toolbar_left.$imgFilesAdd(files);
                        console.log('$refs:',this.$refs);
                    }
                }
            },
            $paste($e) {
                var clipboardData = $e.clipboardData;
                if (clipboardData) {
                    var items = clipboardData.items;
                    if (!items) return;
                    var types = clipboardData.types || [];
                    var item = null;
                    for (var i = 0; i < types.length; i++) {
                        if (types[i] === 'Files') {
                            item = items[i];
                            break;
                        }
                    }
                    if (item && item.kind === 'file') {
                        // prevent filename being pasted parallel along
                        // with the image pasting process
                        stopEvent($e)
                        var oFile = item.getAsFile();
                        // this.$refs.toolbar_left.$imgFilesAdd([oFile,]);
                        console.log('$refs:',this.$refs);
                    }
                }
            },

        },
        computed: {
            // compiledMarkdown: function() {
            //     return marked(this.d_value, {
            //         sanitize: true
            //     })
            // }
        },
        watch: {
            d_value: function (val, oldVal) {
                this.iRender(val);
            },
            value: function (val, oldVal) {
                if (val !== this.d_value) {
                    this.d_value = val
                    let $vm = this;
                }
            },
            subfield: function (val, oldVal) {
                this.s_subfield = val
            },
            defaultOpen: function (val) {
                let default_open_ = val;
                if ( !default_open_) {
                    default_open_ = this.subfield?'preview':'edit';
                }
                return this.s_preview_switch = default_open_ === 'preview' ? true : false;
            },
            // input: function() {
            //     let data = {};
            //     data.mdValue = this.input;
            //     data.htmlValue = marked(this.input, {
            //         sanitize: true
            //     });
            //     this.$emit('childevent', data);
            //     let maxEditScrollHeight=document.querySelector('.mdEditor').scrollHeight-document.querySelector('.mdEditor').clientHeight;
            //     let maxPreviewScrollHeight=document.querySelector('.previewContainer').scrollHeight-document.querySelector('.previewContainer').clientHeight;
            //     this.maxEditScrollHeight = maxEditScrollHeight
            //     this.maxPreviewScrollHeight = maxPreviewScrollHeight
            // }
        },
        components: {
            'v-autoTextarea': autoTextarea,
            'md-toolbar-left': md_toolbar_left,
            'md-toolbar-right': md_toolbar_right
        }
    }
</script>

<style lang="scss">
    @import '../assets/css/md-help.scss';
    @import '../assets/css/scroll.scss';

    /*引入github的markdown样式文件*/
    @import "../assets/css/github-markdown.min.css";
    @import "../assets/css/atom-one-light.min.css";
</style>
