require(['jquery', 'bootstrap', 'tem', 'mock', 'api', 'until'], function ($, boot, tem, mock, Api, Until) {
    var logn = Until.log,
        renderTem = Until.renderTem,
        beforeTem = Until.beforeTem,
        afterTem = Until.afterTem;



    function initData() {
        $.when(Api.banner(), Api.topics(),Api.note(),Api.writer())
            .then(function (sliders, topics,note,writer) {
                renderTem('slide', 'slide_tem', {
                    sliders: sliders.data.sliders
                });
                renderTem('tags', 'tag_tem', {
                    topics: topics.data.tags
                });
                $('#tags').append('<a class="more">更多专题</a>')
                $('.more').on('click', function () {
                    if ($('.tag-item').length >= 21) {
                        $(this).html('已经没有更多了');
                        return
                    }
                    Api.topics().then(function (topics) {
                        beforeTem($('.more'), 'tag_tem', {
                            topics: topics.data.tags
                        })
                    })
                });
                renderTem('note','note_tem',{
                    note:note.data.note
                });
                $('.note-more').on('click',function(){
                    if($('.note-box').length>=30){
                        $(this).html('已经没有更多了').fadeOut('slow');
                        return;
                    }
                    Api.note().then(function(note){
                        afterTem($('.note-list'),'note_tem',{
                            note:note.data.note
                        })
                    })
                });

                 renderTem('writer','writer_tem',{
                    writer:writer.data.writer
                });
                
                
                Until.closeLoading();
            })
    }

    $(function () {
        Until.globalLoading();
        initData();
        $("[data-toggle='popover']").popover();
        $("[data-toggle='tooltip']").tooltip(); 
    })

})