/**
 * 滚动条联动
 */
export const scrollLink = ($event, $vm) => {
    let element = $event.srcElement ? $event.srcElement : $event.target
    let ratio = element.scrollTop / (element.scrollHeight - element.offsetHeight)
    if ($vm.edit_scroll_height >= 0 && element.scrollHeight !== $vm.edit_scroll_height && (element.scrollHeight - element.offsetHeight - element.scrollTop <= 30)) {
        // star 内容变化 导致 高度增加  且滚动条距离底部小于25px  自动滚动到底部
        $vm.$refs.vNoteEdit.scrollTop = element.scrollHeight - element.offsetHeight
        ratio = 1
    }
    $vm.edit_scroll_height = element.scrollHeight
    // end ----
    if ($vm.$refs.vShowContent.scrollHeight > $vm.$refs.vShowContent.offsetHeight) {
        $vm.$refs.vShowContent.scrollTop = ($vm.$refs.vShowContent.scrollHeight - $vm.$refs.vShowContent.offsetHeight) * ratio
    }
}

export function loadScript(src, callback) {
    if (!(typeof callback === 'function')) {
        callback = function() {};
    }
    var check = document.querySelectorAll("script[src='" + src + "']");
    if (check.length > 0) {
        check[0].addEventListener('load', function() {
            callback();
        });
        callback();
        return;
    }
    var script = document.createElement('script');
    var head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
        script.addEventListener('load', function () {
            callback();
        }, false);
    } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState === 'loaded') {
                callback();
            }
        });
    }
    head.appendChild(script);
}

/**
 * textarea 插入内容
 */
export const insertTextAtCaret = (obj, {prefix, subfix, str}, $vm) => {
    obj.focus()
    if (document.selection) {
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart;
        var endPos = obj.selectionEnd;
        var tmpStr = obj.value;
        if (startPos === endPos) {
            // 直接插入
            obj.value = tmpStr.substring(0, startPos) + prefix + str + subfix + tmpStr.substring(endPos, tmpStr.length);
            obj.selectionStart = startPos + prefix.length;
            obj.selectionEnd = startPos + (str.length + prefix.length);
        } else {
            // 存在选中区域
            if (tmpStr.substring(startPos - prefix.length, startPos) === prefix && tmpStr.substring(endPos, endPos + subfix.length) === subfix) {
                // 取消
                obj.value = tmpStr.substring(0, startPos - prefix.length) + tmpStr.substring(startPos, endPos) + tmpStr.substring(endPos + subfix.length, tmpStr.length);
                obj.selectionStart = startPos - prefix.length;
                obj.selectionEnd = endPos - prefix.length;
            } else {
                // 确定
                obj.value = tmpStr.substring(0, startPos) + prefix + tmpStr.substring(startPos, endPos) + subfix + tmpStr.substring(endPos, tmpStr.length);
                obj.selectionStart = startPos + prefix.length;
                obj.selectionEnd = startPos + (endPos - startPos + prefix.length);
            }
        }
    } else {
        alert('else')
        // obj.value += str;
    }
    // 触发change事件
    $vm.d_value = obj.value
    obj.focus()
}
// 插入tab
export const insertTab = ($vm) => {
    let obj = $vm.getTextareaDom();
    if (document.selection) {
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart;
        var endPos = obj.selectionEnd;
        var tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + '    ' + tmpStr.substring(endPos, tmpStr.length);
        obj.selectionStart = obj.selectionEnd = startPos + 4;
    } else {
        alert('else')
        // obj.value += str;
    }
    // 触发change事件
    $vm.d_value = obj.value
    obj.focus();
}
