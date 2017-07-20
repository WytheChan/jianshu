/**
 * 是一个图片轮播效果，会有一个配置参数
 * @param {Object} obj 是一个配置选项
 * 
 * 配置如下：
 * isArrowContrl    Boolean   是否启用左右切换功能        默认值 false
 * isplay           Boolean   是否启用自动播放            默认值  false
 * delay            Number    自动播放的延迟时间          默认值 3000
 * container        Object    width：默认是图片宽度 height：默认是图片的高度 可选参数，初始化容器的宽高
 * element          容器的class名字
 * 
 */


(function (win, doc) {
    function extend() {
        var obj = {};
        var arg = arguments;
        var len = arg.length;
        for (var i = 0; i < len; i++) {
            for (var key in arg[i]) {
                obj[key] = arg[i][key];
            }
        }
        return obj;
    }

    function css(obj) {
        var arg = arguments;
        var len = arg.length;
        if (len === 2) {
            if (typeof arg[1] === 'object') {
                for (var key in arg[1]) {
                    obj.style[key] = arg[1][key];
                }
            } else {
                return window.currentStyle ? obj.currentStyle[arg[1]] : getComputedStyle(obj)[arg[1]];
            }
        }
        if (len === 3) {
            obj.style[arg[1]] = arg[2];
        }
    }

    function Slider(options) {
        this.config = extend({
            isArrowContrl: false,
            isplay: false,
            delay: 3000,
            element: doc.getElementById('slider-container'),
            size: {
                width: null,
                height: null
            }
        }, options);
        this.config.size.width = this.config.element.getElementsByTagName('img')[0].width;
        this.config.size.height = this.config.element.getElementsByTagName('img')[0].height;
        this.wrapper = this.config.element.querySelector('.slider-wrapper');
        this.slider = this.config.element.querySelectorAll('.slider-container .slider');
        this.poins = null;
        this.prev = null;
        this.next = null;
        this.timer = null;
        this.done = false;
        this.index = 1;
        this.len = 0;
        this.init();

    }
    Slider.prototype = {
        constructor: Slider,
        init: function () {
            var config = this.config;
            var first = this.wrapper.firstElementChild.cloneNode(true); //克隆 复制
            var last = this.wrapper.lastElementChild.cloneNode(true);
            var self = this;
            this.wrapper.appendChild(first);
            this.wrapper.insertBefore(last, this.wrapper.firstElementChild);
            this.len = config.element.querySelectorAll('.slider').length;
            css(this.wrapper, {
                left: -config.size.width + 'px',
                width: this.len * config.size.width + 'px'
            });
            this.createArrow();
            this.createPoin();
            css(config.element, {
                width: config.size.width + 'px',
                height: config.size.height + 'px'
            });
            if (config.isArrowContrl) {
                this.prev.style.display = 'block';
                this.next.style.display = 'block';
                this.prevClick();
                this.nextClick();
            } else {
                this.prev.style.display = 'none';
                this.next.style.display = 'none';
            }
            if (config.isplay) {
                this.play();

                config.element.onmouseover = function () {
                    self.stop();
                }
                config.element.onmouseout = function () {
                    self.play();
                }
            }

        },
        play: function () {
            var self = this;
            this.timer = setInterval(function () {
                self.next.onclick();
            }, this.config.delay);
        },
        stop: function () {
            clearInterval(this.timer);
        },
        prevClick: function () {
            var self = this;
            this.prev.onclick = function () {
                if (!self.done) {
                    self.animate(self.config.size.width, function () {
                        self.index = self.index === 1 ? (self.len - 2) : self.index - 1;
                        self.showPoin();
                    })
                }
            }
        },
        nextClick: function () {
            var self = this;
            self.next.onclick = function () {
                if (!self.done) {
                    self.animate(-self.config.size.width, function () {
                        self.index = self.index === (self.len - 2) ? 1 : self.index + 1;
                        self.showPoin();
                    })
                };
            }
        },
        createArrow: function () {
            this.prev = document.createElement('div');
            this.prev.className = 'slider-btn slider-prev';
            this.prev.innerText = '<';
            this.config.element.appendChild(this.prev);
            this.next = document.createElement('div');
            this.next.className = 'slider-btn slider-next';
            this.next.innerText = '>';
            this.config.element.appendChild(this.next);
        },
        createPoin: function () {
            var self = this;
            var sliderPoins = document.createElement('div');
            sliderPoins.className = 'slider-poins';
            for (var i = 0; i < this.len - 2; i++) {
                var poin = document.createElement('div');
                poin.className = 'poin';
                poin.index = i + 1;
                sliderPoins.appendChild(poin);
            }

            this.config.element.appendChild(sliderPoins);
            this.poins = this.config.element.querySelectorAll('.poin');
            this.poins[0].className = 'poin active';
            for (var i = 0; i < this.poins.length; i++) {
                this.poins[i].onclick = function () {
                    // 当前按下的poins-当前索引index
                    var offset = (this.index - self.index) * -self.config.size.width;
                    if (!self.done) {
                        self.animate(offset)
                    };
                    self.index = this.index;
                    self.showPoin();
                }
            }
        },
        showPoin: function () {
            for (var i = 0; i < this.poins.length; i++) {
                if (/active/g.test(this.poins[i].className)) {
                    this.poins[i].className = this.poins[i].className.replace(/active/g, '');
                    break;
                }
            }
            this.poins[this.index - 1].className = 'poin active'
        },
        animate: function (offset, callback) {
            var newLeft = parseInt(css(this.wrapper, 'left')) + offset;
            var time = 300;
            var interval = 10;
            var speed = offset / (time / interval);
            var self = this;

            function start() {
                self.done = true;
                if (
                    (speed < 0 &&
                        parseInt(css(self.wrapper, 'left')) > newLeft) ||
                    (speed > 0 &&
                        parseInt(css(self.wrapper, 'left')) < newLeft)
                ) {
                    self.wrapper.style.left = parseInt(css(self.wrapper, 'left')) + speed + 'px';
                    setTimeout(start, interval);
                } else {
                    self.done = false;
                    self.wrapper.style.left = newLeft + 'px';
                    if (parseInt(css(self.wrapper, 'left')) < -self.config.size.width * (self.len - 2)) {
                        self.wrapper.style.left = -self.config.size.width + 'px';
                    }
                    if (parseInt(css(self.wrapper, 'left')) > -self.config.size.width) {
                        self.wrapper.style.left = -self.config.size.width * (self.len - 2) + 'px';
                    }
                    callback && callback();
                }
            }
            start();
        }
    }

    win['Slider'] = Slider;
}(window, document));