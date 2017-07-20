(function (win, doc) {
    /**
     * 1.对象的首字母必须大写
     * 2.私有属性和私有方法名字首个字符是_
     *  私有属性和私有方法：只有在对象内部使用
     * 3.每一个组件都会有默认选项，这个数据使用一个json存储
     * 4.将构造函数的参数和默认选项合并
     */
    function extend() {
        var obj = {};
        var arg = arguments;
        var len = arg.length;
        for (var i = 0; i < len; i++) {
            for(var key in arg[i]){
                obj[key]=arg[i][key];
            }
        }
        return obj;
    }

    function getWinSize() {
        return {
            w: window.innerWidth || document.documentElement.clientWidth,
            h: window.innerHeight || document.documentElement.clientHeight,
        }
    }

    function Drag(option) {
        var setting = {
            isXianzhi: false
        }
        this.config = extend(setting, option);
        this.x = null;
        this.y = null;
        this.width = parseInt(this.getStyle(this.config.obj, 'width'));
        this.height = parseInt(this.getStyle(this.config.obj, 'height'));
        this.bodyW = getWinSize().w;
        this.bodyH = getWinSize().h;


        this.init();
        this.start();
    };

    Drag.prototype = {
        constructor: Drag,
        start: function () {
            var self = this;
            this.config.obj.onmousedown = function () {
                self.config.obj.style.zIndex = 9999;
                doc.onmousemove = function (event) {
                    var ev = window.event || event;
                    self.move(ev);
                }
                doc.onmouseup = function () {
                    self.config.obj.style.zIndex = 1;
                    doc.onmousemove = null;
                }
            }
        },
        getStyle: function (obj, attr) {
            return window.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
        },
        init: function () {
            var pos = this.getStyle(this.config.obj, 'position');
            if (pos !== 'fixed') this.config.obj.style.position = 'fixed';
            this.config.obj.style.zIndex = 1;

        },

        move: function (event) {

            this.x = event.clientX;
            this.y = event.clientY;
            this.config.obj.style.left = this.x - Math.floor(this.width / 2) + 'px';
            this.config.obj.style.top = this.y - Math.floor(this.height / 2) + 'px';
            if (this.config.isXianzhi) this.xianzhi();

        },
        xianzhi: function () {
            var obj = this.config.obj;
            if (parseInt(this.getStyle(obj, 'left')) < 0) obj.style.left = 0;
            if (parseInt(this.getStyle(obj, 'top')) < 0) obj.style.top = 0;
            if (parseInt(this.getStyle(obj, 'left')) > (this.bodyW - this.width)) obj.style.left = this.bodyW - this.width + 'px';
            if (parseInt(this.getStyle(obj, 'top')) > (this.bodyH - this.height)) obj.style.top = this.bodyH - this.height + 'px';
        }
    }

    win['Drag'] = Drag;
}(window, document));