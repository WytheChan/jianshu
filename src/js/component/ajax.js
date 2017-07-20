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

    function Ajax(opt) {
        this.config = extend({
            method: 'GET',
            url: '',
            data: null,
            success:function(){}
        }, opt);
        this.xhr = this.createXhr();
        this.url = this.config.url;
        this.data = this.config.data ? this.pinjie(obj.data) : '';
        this.method = this.config.method;
        this.ajax();
    }

    Ajax.prototype = {
        constructor: Ajax,
        ajax: function () {    
            var self=this; 
      
            if (this.method === 'GET') {
                if (this.data) {
                    this.url+= + '?' + this.data;
                    
                    this.xhr.open(this.method, this.url, true);
                    this.xhr.send()
                } else {
                    this.xhr.open(this.method, this.url, true);
                    this.xhr.send()   
                }
            }else if (this.method === 'POST') {
                if (this.data) {
                    this.xhr.open(this.method, this.url, true);
                    this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                    this.xhr.send(this.data)
                } else {
                    this.xhr.open(this.method, this.url, true);
                    this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                    this.xhr.send()
                }
            }
            this.xhr.onreadystatechange=function(){
                 if (self.xhr.readyState === 4 && (self.xhr.status === 200 || self.xhr.status === 304)) {
                  
                
                    self.config.success(self.xhr.responseText);
                }
            }
        },
        createXhr: function () {
            return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        },
        pinjie: function (data) {
            var str = '';
            for (var key in data) {
                str += key + '=' + data[key] + '&'
            }

            return str.slice(0, str.length - 1);
        },
        get:function(){
           
        }
    }
    window.Ajax = function(opt){
        return new Ajax(opt)
    };

}(window, document));