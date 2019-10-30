$(document).ready(function () {
    $('#fullpage').fullpage({

        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8'],

        //options here
        autoScrolling: true,
        scrollHorizontally: true,

        //设置小圆点
        navigation: true,
        navigationPosition: "right",
        scrollingSpeed: 1200,//滚动转换的速度

        //回调函数
        afterLoad: function (origin, destination, direction) {
            var loadedSection = this;

            if (origin) {
                // 移动到第二屏开始动画
                if (destination.index == 1) {
                    // search move to the right
                    $(".search").show().stop().animate({ "right": "40%" }, 500, function () {
                        //search keyword display
                        $(this).children(".search-words").stop().animate({"opacity":1},1000,function(){
                            //search hidden
                            $(this).parent(".search").hide();
                            //search move to the Upper right corner and shrink
                            $(".search-02-1").show().animate({"width":148,"height":30,"top":"5%","right":"23%"},500);
                            //search conent Zoom in and out animation
                            $(".goods-441-218").show().animate({"width":441,"height":218},1000);
                            //text Fade out effect
                            $(".words-01").hide();
                            $(".words-02").fadeIn("slow");
                        });
                    });

                }
            }






        },


        onLeave:function(origin, destination, direction){
            if(origin){
                console.log(destination.index);
                
                if(destination.index ==2){
                    $(".computer-shirt-02").show().stop().animate({"bottom":0},500);
                    $(".cover").show();
                };
                
            }
        },


    });

    //methods

    //禁用鼠标滚动
    // $.fn.fullpage.setAllowScrolling(false);

});
