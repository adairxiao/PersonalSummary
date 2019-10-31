


$(document).ready(function () {

    var w = window.innerHeight;//当前屏幕高度
    var flag = { "page2": false, "page3": false, "page4": false } //动画状态
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
                if (destination.index == 1 && flag.page2 === false) {
                    // search move to the right
                    $(".search").show().stop().animate({ "right": "40%" }, 500, function () {
                        //search keyword display
                        $(this).children(".search-words").stop().animate({ "opacity": 1 }, 1000, function () {
                            //search hidden
                            $(this).parent(".search").hide();
                            //search move to the Upper right corner and shrink
                            $(".search-02-1").show().animate({ "width": 148, "height": 30, "top": "5%", "right": "23%" }, 500);
                            //search conent Zoom in and out animation
                            $(".goods-441-218").show().animate({ "width": 441, "height": 218 }, 1000, function () {
                                flag.page2 = true;
                            });
                            //text Fade out effect
                            $(".words-01").hide();
                            $(".words-02").fadeIn("slow");
                        });
                    });



                }
            }






        },


        onLeave: function (origin, destination, direction) {
            if (origin) {
                //移动到第三屏开始动画
                if (destination.index == 2 && flag.page2 === true && flag.page3 === false) {
                    $(".cover").show();
                    // 沙发落下来的效果
                    $(".computer-shirt-02").show().stop().animate({ "bottom": -(w - 250), "width": 207, "left": 260 }, 900, function () {
                        $(".img-01-a").animate({ "opacity": 1 }, 900);
                        $(".btn-01").attr({ src: '../H5Shopping/images/btn-01-a.gif' }).css("opacity", 0.1).animate({ "opacity": 1 }, 900);
                        flag.page3 = true;
                    });
                    $(".main-shirt-02").hide()
                };
                //移动到第四屏开始动画
                
                
                if (destination.index == 3 && flag.page4 === false) {
                    // 隐藏沙发
                    if (flag.page2 == true) {
                        $(".computer-shirt-02").hide();
                        
                    } else if (flag.page4 != true) {
                        $(".main-shirt-02").hide();
                        console.log(1);
                    };
                    // 沙发落下来的效果
                    $(".main-t1f").show().animate({ "bottom": -(w - 250 + 50), "left": 292 }, 2000, function () {
                        $(this).hide();
                        $(".car-t1f").show();
                        $(".car").animate({ "left": "150%" }, 4000, function () {
                            $(".words-04-a").show();
                            $(".t1").animate({ "opacity": 1 }, 1000, function () {
                                $(".t1-content").animate({ "opacity": 1 }, 1000);
                                flag.page4 = true;
                                

                            });
                        });
                    });

                }
            }
        },


    });

    //methods

    //禁用鼠标滚动
    // $.fn.fullpage.setAllowScrolling(false);

});

