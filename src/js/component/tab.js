(function (win, doc) {


    /**
     * 添加class
     * @param {Element} obj dom元素
     * @param {String} name class名字
     */
    function addClass(obj, name) {
        if (!(/\b\w\b/g.test(obj.className))) {
            console.log('111');
            obj.className += ' ' + name + ' ';
        } else {
            return;
        }
    }


    /**
     * 删除class
     * @param {Element} obj dom元素
     * @param {String} name 需要删除的Class名字
     */
    function removeClass(obj, name) {
        if (/\b.+\b/.test(obj.className)) {
            obj.className = obj.className.replace(name, ' ').trim();
        } else {
            return;
        }
    }

    function tab(obj) {
        var container = obj.container ? doc.querySelector(obj.container) : doc.querySelector('.tab-container');

        var controls = container.querySelector('.tab-controls');
        var btns = container.querySelectorAll('.tab-btn');

        var warpper = container.querySelector('.tab-warpper');
        var views = container.querySelectorAll('.tab-view');
        console.log(views);
        init();

        function init() {
            viewsInit();
            for (var i = 0; i < btns.length; i++) {
                (function (a) {
                    if (obj.type === 'click') {
                        btns[a].onclick = function () {
                            if (/active/g.test(btns[a].className)) {
                                return;
                            }
                            reset(a);
                        }
                    } else if (obj.type === 'hover') {
                        btns[a].onmouseover = function () {
                            if (/active/g.test(btns[a].className)) {
                                return;
                            }
                            reset(a);
                        }
                    } else {
                        btns[a].onclick = function () {
                            if (/active/g.test(btns[a].className)) {
                                return;
                            }
                            reset(a);
                        }
                    }

                }(i))
            }
        }

        function viewsInit() {
            if (obj.type === 'fade') {
                for (var i = 0; i < views.length; i++) {
                    views[i].style.transitionProperty = 'all';
                    views[i].style.transitionDuration = '0.5s';
                    views[i].style.opacity = '0';
                }
                views[0].style.opacity = 1;
            } else {
                for (var i = 0; i < views.length; i++) {
                    views[i].style.display = 'none';
                }
                views[0].style.display = 'block';
            }
        }

        function reset(index) {
            for (var i = 0; i < btns.length; i++) {
                removeClass(btns[i], 'active');
                obj.type === 'fade' ? views[i].style.opacity = '0' : views[i].style.display = 'none';
            }
            addClass(btns[index], 'active');
            obj.type === 'fade' ? views[index].style.opacity = '1' : views[index].style.display = 'block';
        }
    }



    window['tab'] = tab;

}(window, document))