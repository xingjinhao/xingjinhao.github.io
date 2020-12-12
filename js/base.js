(function (win) {
    var docEl = win.document.documentElement;
    var tid;

    function setRemUtils() {
        // 获取rem基准值
        var rem = docEl.clientWidth / 20; // 窗口宽度，如果是750设计图，则将10改为20
        // 动态设置html根元素的font-size 
        docEl.style.fontSize = rem + 'px';
    }

    setRemUtils();
    // 窗口变化时触发
    win.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(setRemUtils, 300);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(setRemUtils, 300);
        }
    }, false);
})(window)
//禁止右键点击
function doProhibit() {
    if (window.Event)
        document.captureEvents(Event.MOUSEUP);

    function nocontextmenu() {
        event.cancelBubble = true
        event.returnvalue = false;
        return false;
    }

    function norightclick(e) {
        if (window.Event) {
            if (e.which == 2 || e.which == 3)
                return false;
        } else if (event.button == 2 || event.button == 3) {
            event.cancelBubble = true
            event.returnvalue = false;
            return false;
        }
    }
    document.oncontextmenu = nocontextmenu; // for IE5+ 
    document.onmousedown = norightclick; // 
}