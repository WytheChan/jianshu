define(function(require) {
    var $=require('jquery');
    var tem=require('tem');
    function until(){

    }
    until.prototype.type=function(str){
        var type=Object.prototype.toString.call(str);
        return /\[.+\s(.+)\]/.exec(type)[1].toLowerCase();
    }
    until.prototype.isNumber=function(data){
        return this.type(data)==='number';
    }
     until.prototype.isArray=function(data){
        return this.type(data)==='array';
    }
     until.prototype.isPhone=function(data){
        return /^1[35678]\d{9}/.test(data);
    }
     until.prototype.isEmpty=function(data){
        return data===undefined||data===null||data===0;
    }
     until.prototype.renderTem=function(domID,temID,data){
       var html=tem(temID,data);
       $('#'+domID).html(html);
    }
    until.prototype.beforeTem=function(dom,temID,data){
       var html=tem(temID,data);
       dom.before(html);
    }
    until.prototype.afterTem=function(dom,temID,data){
       var html=tem(temID,data);
       dom.append(html);
    }
     until.prototype.globalLoading=function(text){
      var text=text||'正在加载中...';
      $('body').append([
           '<div class="global-loading text-center">',
       ' <i class="fa fa-refresh fa-spin fa-3x"></i>',
       ' <p>'+text+'</p>',
  '  </div>'
      ].join(''))

    }

     until.prototype.closeLoading=function(){
       $('.global-loading').fadeOut(500,function(){
           $(this).remove();
       })
    }



    return new until();
});