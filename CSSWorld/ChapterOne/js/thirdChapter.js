
// 例子3-1-1
var obj = document.querySelector("#select");
obj.addEventListener("change", function () {
    var value = obj.value;
    var box = document.querySelector(".box-bg");
    console.log(value);

    if (value == "block") {
        box.setAttribute("class", "box-bg clear block");
    } else if (value == "table") {
        box.setAttribute("class", "box-bg clear table");
    } else if (value == "list-item") {
        box.setAttribute("class", "box-bg clear list-item");
    } else {
        box.setAttribute("class", "box-bg clear ");
    }
});





// 例子3-2-5
var button = document.querySelector("#btnMore"),
    content = document.querySelector('#conMore');
console.log(button.addEventListener);
if (button.addEventListener) {
    button.addEventListener("click", function () {
        content.innerHTML += "新增文字"
    });
}


// 例子3-2-7
var myScroll;
document.querySelector("body").onload = function () {
    myScroll = new IScroll("#wrapper", {
        // 鼠标滚轮支持和滚动条支持
        mouseWheel: true,
        scrollbars: true,
        // 开启x轴的滚动条 关闭y轴的滚动条
        scrollX: true,
        scrollY: false
    });

}