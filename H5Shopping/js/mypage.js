


$(document).ready(function () {

    var w = window.innerHeight;//当前屏幕高度
    var flag = { "page2": false, "page3": false, "page4": false, "page5": false, "page6": false, "page7": false, "page8": false } //动画状态
    
    $(".next").on("click",function(){
        fullpage_api.moveSectionDown();
    });
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
                    flag.page2 = true;
                    $(".next").fadeOut();
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

                            });
                            //text Fade out effect
                            $(".words-01").hide();
                            $(".words-02").fadeIn("slow");

                            $(".next").fadeIn("slow");
                        });
                    });



                }
            }






        },


        onLeave: function (origin, destination, direction) {
            if (origin) {
                //移动到第三屏开始动画
                if (destination.index == 2 && flag.page2 === true && flag.page3 === false) {
                    flag.page3 = true;
                    $(".cover").show();
                    // 沙发落下来的效果
                    $(".computer-shirt-02").show().stop().animate({ "bottom": -(w - 250), "width": 207, "left": 260 }, 900, function () {
                        $(".img-01-a").animate({ "opacity": 1 }, 900);
                        $(".btn-01").attr({ src: '../H5Shopping/images/btn-01-a.gif' }).css("opacity", 0.1).animate({ "opacity": 1 }, 900);

                    });
                    $(".main-shirt-02").hide()
                };
                //移动到第四屏开始动画
                if (destination.index == 3 && flag.page4 === false) {
                    flag.page4 = true;
                    // 隐藏沙发
                    if (flag.page2 == true) {
                        $(".computer-shirt-02").hide();

                    } else if (flag.page4 != true) {
                        $(".main-shirt-02").hide();

                    };
                    // 沙发落下来的效果
                    if (flag.page5 !== true) $(".main-t1f").show();

                    $(".main-t1f").animate({ "bottom": -(w - 250 + 50), "left": 292 }, 2000, function () {
                        $(this).hide();
                        $(".car-t1f").show();
                        $(".car").animate({ "left": "150%" }, 4000, function () {
                            $(".words-04-a").show();
                            $(".t1").animate({ "opacity": 1 }, 1000, function () {
                                $(".t1-content").animate({ "opacity": 1 }, 1000);



                            });
                        });
                    });

                }

                //移动到第五屏开始动画
                if (destination.index == 4 && flag.page5 === false) {
                    flag.page5 = true;
                    $(".hand").show().stop().animate({ "bottom": "-10%" }, 2000, function () {
                        $(".mouse-down").show();
                        $(".item-5-sofa").show().animate({ "bottom": "10%" }, 2000, function () {
                            $(".item-5-card-form").animate({ "bottom": "420px" }, 2000);

                        });
                    });
                }


                //移动到第六屏开始动画
                if (destination.index == 5 && flag.page6 === false) {
                    flag.page6 = true;
                    if (flag.page5 === true) {
                        $(".item-5-sofa").animate({ "bottom": -(w - 500), "left": "40%", "width": 65 }, 1500, function () {
                            $(this).hide().css({ "bottom": 960, "left": "25%", "width": 198 });
                        });
                    }else{
                        $(".item-6-sofa").animate({ "top":"42%", "left": "40%", "width": 65 }, 1500, function () {
                            $(this).hide();
                        });
                    }

                    $(".item-6-box").show().animate({ "left": "42%" }, 1500, function () {
                        $(this).animate({ "bottom": 20 }, 1500, function () {
                            $(this).hide();

                            $(".section-item-6").animate({ "backgroundPositionX": "100%" }, 4000, function () {
                                $(".word-tips-01").show();
                                $(".item-6-pop").show();
                                $(".boy").show().animate({ "width": 252, "height": 305, "bottom": 113 }, 1000, function () {
                                    $(this).animate({ "right": "40%" }, 500, function () {
                                        $(".door").animate({ "opacity": 1 }, 200, function () {
                                            $(".girl").show().animate({ "right": 350, "height": 306 }, 500, function () {
                                                $(".receipt").show();
                                            });
                                        });
                                    });
                                })
                            });
                        });
                    }
                    );
                }

                //移动到第七屏开始动画
                if (destination.index == 6 && flag.page7 === false) {
                    flag.page7 = true;
                    var i = 0;
                    var intervalID = setInterval(function () {
                        $(".star >ul>li").eq(i).show();
                        i++;
                        if (i === 5) {
                            $(".good-word").show();
                            clearInterval(intervalID);
                        }
                    }, 500);
                }

                //移动到第八屏开始动画
                if (destination.index == 7 && flag.page8 === false) {
                    flag.page8 = true;
                    // $(document)
                    $(".section-item-8").on("mousemove", function (event) {
                        var x = event.pageX - $(".hand").width() / 2;
                        var y = event.pageY + 10;
                        var s = event.pageY;
                        var clientH = document.body.clientHeight;
                        // $(".hand").height()高度不对
                        var imgH = 449;
                        if (s <= clientH - imgH) {
                            y = 520
                        }
                        $(".hand").css({ "left": x, "top": y });
                    });

                    $(".again").on("click", function () {
                        //返回第一屏
                        $.fn.fullpage.moveTo(1);
                        //还原前几屏的动画
                        $("img,.move,.star>ul>li").attr("style", "");
                        flag = { "page2": false, "page3": false, "page4": false, "page5": false, "page6": false, "page7": false, "page8": false } //动画状态

                    });
                }
            }
        },


    });

    //methods

    //禁用鼠标滚动
    // $.fn.fullpage.setAllowScrolling(false);

});

