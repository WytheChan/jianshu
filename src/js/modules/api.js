define(function (require) {
    var $ = require('jquery'),
        apiUrls = require('url'),
        testMock = require('testMock');
    testMock.fire();


    function api() {}
    api.prototype.login = function (arg) {
        var dtd = $.Deferred();
        $.post(apiUrls.login, arg, function (data) {
            var result = JSON.parse(data);
            if (result.success) {
                dtd.resolve(result);
            }
        });
        return dtd;
    }


    api.prototype.register = function (arg) {
        var dtd = $.Deferred();
        $.get(apiUrls.register, arg, function (data) {
            dtd.resolve(JSON.parse(data));
        })
        return dtd;
    }

   api.prototype.banner = function (arg) {
        var dtd = $.Deferred();
        $.get(apiUrls.banner, arg, function (data) {
            var result = JSON.parse(data);
            if (result.success) {
                dtd.resolve(result);
            }
        });
        return dtd;
    }
     api.prototype.topics = function (arg) {
        var dtd = $.Deferred();
        $.get(apiUrls.topics, arg, function (data) {
            var result = JSON.parse(data);
            if (result.success) {
                dtd.resolve(result);
            }
        });
        return dtd;
    }

    api.prototype.note=function(arg){
        var dtd=$.Deferred();
        $.get(apiUrls.note,arg,function(data){
            var result=JSON.parse(data);
            if(result.success){
                dtd.resolve(result);
            }
        })
        return dtd;
    }
    api.prototype.writer=function(arg){
        var dtd=$.Deferred();
        $.get(apiUrls.writer,arg,function(data){
            var result=JSON.parse(data);
            if(result.success){
                dtd.resolve(result);
            }
        })
        return dtd;
    }
    return new api();
})