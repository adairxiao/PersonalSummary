$(document).ready(function () {
    $('#fullpage').fullpage({
        //options here
        autoScrolling: true,
        scrollHorizontally: true,

        //设置小圆点
        navigation:true,
        navigationPosition:"right",
    });

    //methods

    //禁用鼠标滚动
    // $.fn.fullpage.setAllowScrolling(false);

});
