/**
    用来存放我们在学习过程中封装好的函数，我们称这个文件叫做库，函数库，函数仓库，方便我们的调用
 */



/**
 * 检测数据类型
 * @param {any} 传入数据
 * @returns {String} 返回数据类型
 */

// number
//  string
//  boolean
//  array
//  regexp
//  function
//  htmldocument
//  undefined
//  null
//  date
//  math
//  window
function typeOf(data) {
    var getType = Object.prototype.toString;

    var type = getType.call(data);

    return /\[.+\s(.+)\]/gi.exec(type)[1].toLowerCase();
}



/**
 * 自定义抛出异常
 * @param {String} message 错误消息
 */
function error(message) {
    throw new Error(message);
}
/**
 * 使用class来获取元素，兼容低级浏览器
 * @param {String} clsname  需要获取的class名字
 * @returns {Array}  classObjs 数组形式的节点列表
 */
function getClassDOM(clsname) {
    var allObjs = document.getElementsByTagName('*');
    var classObjs = [];
    for (var i = 0; i < allObjs.length; i++) {
        if (allObjs[i].className === clsname) {
            classObjs.push(allObjs[i]);
        }
    }
    return classObjs;
}

/**
 *获取数组类型的节点列表
 * @param {String} name 传入css选择器
 * @returns {Array} 将获得的节点列表转为数组
 */
function $(name) {
    return Array.prototype.slice.call(document.querySelectorAll(name));
}

/**
 * 检查函数执行的时间耗时量
 * @param {Function} fn 执行的函数
 */
function timeout(fn) {
    var start = new Date().getTime();

    fn();

    var end = new Date().getTime();
    console.log('执行耗时：' + (end - start) + '毫秒');

}




/**
 * 鼠标移入移出
 * @param {HTMLElement} obj 一个dom对象
 * @param {Function} over 鼠标移入回调函数 
 * @param {Function} out  鼠标移出回调函数 
 */
function hover(obj, over, out) {
    obj.onmouseover = function () {
        over();
    }
    obj.onmouseout = function () {
        if (out) {
            out();
        }
    }
}

/**
 * 检测对象是否有该class名字
 * @param {HTMLElement} obj dom对象
 * @param {String} name class名字
 */
function hasClass(obj, name) {
    var clsname = obj.className.trim();

    if (/\b.+\b/.test(clsname)) {
        return true;
    } else {
        return false;
    }
}



/**
 * 添加class
 * @param {HTMLElement} obj dom元素
 * @param {String} name class名字
 */
function addClass(obj, name) {
    if (!(/\b\w\b/g.test(obj.className))) {

        obj.className += ' ' + name + ' ';
    } else {
        return;
    }
}


/**
 * 删除class
 * @param {HTMLElement} obj dom元素
 * @param {String} name 需要删除的Class名字
 */
function removeClass(obj, name) {
    if (/\b.+\b/.test(obj.className)) {
        obj.className = obj.className.replace(name, ' ').trim();
    } else {
        return;
    }
}



/**
 * 如果实参传入两个值：会有两种情况
 *      如果是字符串：则返回该元素的样式值
 *      如果是对象：那么就会更新元素的样式
 * 如果传入三个值：则是给元素的第二个参数的样式赋值
 * @param {HTMLElement} obj 必须参数，dom
 */
function css(obj) {
    var arg = arguments;
    var len = arg.length;
    if (len === 2) {
        if (typeof arg[1] === 'object') {
            for (var key in arg[1]) {
                obj.style[key] = arg[1][key];
            }
        } else {
            return getStyle(obj, [arg[1]]);
        }
    }
    if (len === 3) {
        obj.style[arg[1]] = arg[2];
    }
}



/**
 *  函数功能：让dom显示；
 * @param {HTMLElement} obj DOM元素 
 */
function show(obj) {
    css(obj, 'display', 'block');
}


/**
 *  函数功能：让dom隐藏
 * @param {HTMLElement} obj DOM元素 
 */
function hide(obj) {
    css(obj, 'display', 'none');
}


/**
 * 如果实参传入一个值，表示获取该对象的innerHTML
 * 如果实参传入两个值，表示该对象的innerHTML重新赋值
 * @param {HTMLElement} obj 传入操作的dom元素 
 */
function html(obj) {
    var arg = arguments;
    var len = arg.length;
    if (len === 1) {
        return obj.innerHTML;
    }
    if (len === 2) {
        obj.innerHTML = arg[1];
    }
}


/**
 * 如果实参传入一个值，表示获取该对象的innerText
 * 如果实参传入两个值，表示该对象的innerText重新赋值
 * @param {HTMLElement} obj 传入操作的dom元素 
 */
function text(obj) {
    var arg = arguments;
    var len = arg.length;
    if (len === 1) {
        return obj.innerText;
    }
    if (len === 2) {
        obj.innerText = arg[1];
    }
}




/**
 * 获取dom的css属性
 * @param {HTMLElement} obj dom对象
 * @param {String} attr css属性名
 */
function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}




/**
 * js动画
 * @param {HTMLElement} obj dom对象
 * @param {Object} option 需要变化的配置对象
 * @param {Function} callback 执行完成后的回调
 */
function animation(obj, option, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {

        var bStop = true;
        for (var attr in option) {
            var cur = 0;
            if (attr === "opacity") {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                cur = parseInt(getStyle(obj, attr))
            }
            var speed = (option[attr] - cur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur !== option[attr]) {
                bStop = false;
            };
            if (attr == "opacity") {
                obj.style.opacity = (speed + cur) / 100;

            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (callback) callback();
        }
    }, 30)
}



/**
 * 抖动函数
 * @param {HTMLElement} obj dom元素
 * @param {String} attr css的属性名
 * @param {Function} endFn 执行完成后的回调
 */
function shake(obj, attr, endFn) {
    var pos = parseInt(getStyle(obj, attr));
    var arr = []; // 20, -20, 18, -18,16,-16,14,-14 ..... 0
    var num = 0;
    var timer = null;

    for (var i = 20; i > 0; i = i - 2) {
        arr.push(i, -i);
    }
    arr.push(0);

    clearInterval(obj.shake);
    obj.shake = setInterval(function () {
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if (num === arr.length) {
            clearInterval(obj.shake);
            endFn && endFn();
        }
    }, 50);
}


/**
 * 事件监听函数
 * @param {HTMLElement} obj dom对象
 * @param {String} type 事件名字
 * @param {Function} callback 事件回调 
 */
function on(obj, type, callback) {
    function jianrongxing(event) {
        var eventobj = window.event ? window.event : event;
        // window.event ? window.event.cancelBubble = true : event.stopPropagation();

        callback.call(this, eventobj);
    }
    if (window.attachEvent) {
        obj.attachEvent('on' + type, jianrongxing);
    } else {
        obj.addEventListener(type, jianrongxing);
    }
}

/**
 * 事件委托/事件代理
 * @param {HTMLElement} parent 冒泡的父元素
 * @param {String} tagName 标签名字
 * @param {Event} eventName 事件名称
 * @param {Function} callback 事件回调函数
 */
function agent(parent, tagName, eventName, callback) {
    on(parent, eventName, function (e) {
        var tar = e.target;
        if (tar.tagName.toLowerCase() === tagName) {
            callback.call(this, tar, e)
        }
    });
}
/**
 * 生成随机颜色数值
 */
function randomColor() {
    var colorArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += colorArr[randomNum(colorArr.length)];
    }
    return color;
}


/**
 *@param {Number}   num  随机值得范围
 *@returns {String}  随机数值
 */
function randomNum(num) {
    return Math.floor(Math.random() * num)
}


/**
 * @returns {String} 检测浏览器类型
 */
function isBrowers() {
    var browsers = {
        Chrome: 'Google',
        Firefox: 'FF',
        MSIE: 'IE',
        Edge: 'edge'
    }
    var str = window.navigator.userAgent;

    if (str.indexOf('Chrome') > -1) {
        if (str.indexOf('Edge') > -1) {
            return browsers.Edge;
        } else {
            return browsers.Chrome;
        }
    }
    if (str.indexOf('Firefox') > -1) {
        return browsers.Firefox;
    }
    if (str.indexOf('MSIE') > -1) {
        return browsers.MSIE;
    }
}


/**
 * @returns {Object} 返回浏览器的宽高对象
 */
function getWinSize() {
    return {
        w: window.innerWidth || document.documentElement.clientWidth,
        h: window.innerHeight || document.documentElement.clientHeight,
    }
}

/**
 * @returns {Object} 返回将url  '?'后面的参数，组装成一个对象返回
 */
function urlArgs() {
    var args = {}; // 定义一个空对象
    var query = location.search.substring(1); // 查找到查询串，并去掉'? '
    var pairs = query.split("&"); // 根据"&"符号将查询字符串分隔开
    for (var i = 0; i < pairs.length; i++) { // 对于每个片段
        var pos = pairs[i].indexOf('='); // 查找"name=value"
        if (pos === -1) continue; // 如果没有找到的话，就跳过
        var name = pairs[i].substring(0, pos); // 提取name
        var value = pairs[i].substring(pos + 1); // 提取value
        value = decodeURIComponent(value); // 对value进行解码
        args[name] = value; // 存储为属性
    }
    return args; // 返回解析后的参数
}

/**
 * @returns {Number} 返回到浏览器顶部的距离
 */
function scrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
}




// 图片懒加载技术

// 给需要的图片一个 class="lazy-img"  把真实的图片路径设置在asrc属性上
//例子 <img asrc="1.png" class="lazy-img">

function lazyImg() {

    //获取页面的所有lazy-img;
    var lazys = $('.lazy-img');
    console.log(lazys);

    //初始化
    transformImgSource();




    //滚动的距离+浏览器视口的高度》图片到顶部的距离，就是存在可视区域
    function isClient(item) {
        return scrollTop() + getWinSize().h > item.offsetTop ? true : false;
    }

    function transformImgSource() {
        for (var i = 0; i < lazys.length; i++) {
            if (isClient(lazys[i])) {
                lazys[i].setAttribute('src', lazys[i].getAttribute('asrc'));
            }
        }
    }
    on(window, 'scroll', function () {
        setTimeout(function () {
            transformImgSource()
        }, 10);
    })


}


/**
 * 拖拽技术
 * @param {HTMLElement} obj dom元素
 */
function Drag(obj) {
    function move(e) {
        var bodyW = parseInt(getStyle(document.body, 'width'));
        var right = parseInt(bodyW - obj.offsetWidth);
        var x = event.clientX;
        var y = event.clientY;

        obj.style.left = x - Math.floor(obj.offsetWidth / 2) + 'px';
        obj.style.top = y - Math.floor(obj.offsetHeight / 2) + 'px';
        if (parseInt(getStyle(obj, 'left')) < 0) {
            obj.style.left = 0;
        }
        if (parseInt(getStyle(obj, 'top')) < 0) {
            obj.style.top = 0;
        }
        if (parseInt(getStyle(obj, 'left')) > right) {
            obj.style.left = right + 'px';
        }
    };

    function up() {
        document.onmousemove = null;
    }
    obj.onmousedown = function () {
        document.onmousemove = move;
        document.onmouseup = up;
    }
}



/**
 * 设置cookie
 * @param {String} name key名 
 * @param {String} value 值
 * @param {Number} day 过期时间
 */
function setCookie(name, value, day) {
    var date = new Date() + day;
    document.cookie = name + '=' + value + ';expires=' + date;
}

/**
 * 获取cookie值
 * @param {String} name key名 
 * @returns {String} 返回值
 */
function getCookie(name) {
    var cookieText = document.cookie;
    var index = cookieText.indexOf(name + '=');

    if (index != -1) {
        var end = cookieText.indexOf(';', index);
        end = end === -1 ? cookieText.length : end;
        var value = cookieText.substring(index + (name + '=').length, end);
        return value;
    }
}

/**
 * 删除指定的Cookie
 * @param {String} name key名
 */
function delCookie(name) {
    setCookie(name, '', 0);
}