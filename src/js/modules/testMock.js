define(function(require){
    var apiUrls=require('url'),
        mock=require('mock');

        function dataMock(){
            this.mocks=[];
        }
       

        dataMock.prototype.fire=function(){
            this.mocks.forEach(function(item){
                item();             
            })
        }

        dataMock.prototype.add=function(fn){
            this.mocks.push(fn)
        }

        var globalMock=new dataMock();
        globalMock.add(function(){
            mock.mock(apiUrls.login,{
                success:true
            })
        })
        globalMock.add(function(){
            mock.mock(apiUrls.banner,{
                success:true,
                data:{
                    'sliders|5':[{
                        sliderUrl:'@dataImage(945x272)',
                        title:'@ctitle',
                        text:'@cparagraph'
                    }]
                }
            })
        })
        globalMock.add(function(){
            mock.mock(apiUrls.topics,{
                success:true,
                data:{
                    'tags|7':[{
                        tagsUrl:'@dataImage(32x32)',
                        title:'@ctitle(3,6)',
                    }]
                }
            })
        })
          globalMock.add(function(){
            mock.mock(apiUrls.note,{
                success:true,
                data:{
                    'note|10':[{
                        noteUrl_1:'@dataImage(32x32)',
                         noteUrl_2:'@dataImage(150x120,"")',
                         time: '@time',
                        name:'@ctitle(3,6)',
                         text: '@cparagraph'
                    }]
                }
            })
        })

        globalMock.add(function(){
            mock.mock(apiUrls.writer,{
                success:true,
                data:{
                    'writer|5':[{
                        noteUrl_1:'@dataImage(48x48)',
                         num_1: '@number(2,4)',
                          num_2: '@number(2,4)',
                        name:'@ctitle(3,6)',
                     title:'@ctitle(3,6)',
                    }]
                }
            })
        })


        return globalMock;
})