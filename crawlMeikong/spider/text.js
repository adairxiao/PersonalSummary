// 队列实现
class Queue {

    constructor(setcount) {
        // 任务列表
        this.list = [];
        // 当前运行任务
        this.js = 0;
        if (setcount == 0 && typeof setcount != 'number') this.count = 1;
        // 最高并发数
        this.count = setcount;
        // 暂停
        this.ps = false
    };

    clear() {
        //清空任务队列
        this.list.length = 0;
        return this
    };

    pause() {
        //暂停任务队列
        this.ps = true;
    };
    rec() {//恢复任务队列
        this.ps = false;
        this.run();
    };

    set(fn) {
        //设置任务
        this.list.push(fn);
        return this;
    }
    set_run() {
        //设置任务并启动
        this.list.push(fn);
        this.run()
        return this;
    }
    get() {
        //查询任务数
        return this.list.length;
    }
    run() {
        if (!this.ps) {
            //最高并发数-当前运行任务数=可以运行的任务数
            let i = this.count - this.js;
            let p;
            //保存可运行任务
            let k = [];
            //可以运行的任务数-任务数组长度<0的话
            //取可以运行的任务数 否则取任务数组长度
            i - this.list.length > 0 ? p = this.length : p = i;
            //循环写入可运行任务到数组K
            while (p) {

                k.push(this.list.shift() || (() => { }));
                p--;
            }

        }
    }

};



const request = require('request');
const https = require('https');
const fs = require('fs');
const path = require('path');
var pool = https.Agent({ keepAlive: true });

let modelId = {model_id:3805219};

let options = {
    url: 'https://img3.moko.cc//works/3805240/777faedf322f9cda62e87a9a1db76d24.jpg',
    // baseUrl: 'https://app-api413.moko.cc/account/modelInfoDetail',
    method: 'GET',
    // agent: false,
    // headers: {
    //     'Host': 'app-api413.moko.cc',
    //     'Connection': 'keep-alive',
    //     'Accept': '*/*',
    //     'User-Agent': 'Moko/5.0.5 (iPhone; iOS 13.3.1; Scale/3.00)',
    //     'Accept-Language': 'zh-Hans-CN;q=1',
    //     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLWFwaTQxMy5tb2tvLmNjXC9cL2xvZ2luXC9jb2RlTG9naW4iLCJpYXQiOjE1ODU1NjE5NDEsImV4cCI6MTU4NjI4MTk0MSwibmJmIjoxNTg1NTYxOTQxLCJqdGkiOiJDdFlzb1c3Ykt6ZlAwTkxIIiwic3ViIjozODA1MjMwLCJwcnYiOiJjOGJmMTVlNTgyOGU2ZjBmYjJlODI2MzUxOWNlZDg4Y2Y4ZWYyNDBmIn0.G8ln9TKCyvpvIwhqqiK-bCjaoUBVCKTTRX2Y0b3rnOY',
    //     'Accept-Encoding': 'gzip, deflate, br'
    // },
    timeout: 5000,
    // qs:modelId
};
// 请求当前分页列表数据
request(options, (error, response, body) => {
    // console.log(response);


    // if (response.statusCode == 200) {
        // const info = JSON.parse(body);
        // console.log("model:" + info.data);
        // console.log("请求成功");

        // 获取最大页码
        // last_page=info.data.last_page;
        // console.log(last_page);

    // }
    //  else if (error) {
    //     console.log("a=" + error);

    // }

    // console.log(response.statusCode);


}).pipe(fs.createWriteStream(path.join(__dirname,'111.jpg')));



// const chunk = require('chunk');
// 串行

// function sequence(promises) {
//     console.log(promises);

//     return new Promise((resolve, reject) => {
//         let i = 0;
//         const result = [];
//         function callBack() {
//             return promises[i]().then((res) => {
//                 i += 1;
//                 console.log("result：", res);
//                 result.push(res);
//                 if (i === promises.length) {


//                     resolve(result);
//                 }
//                 callBack();
//             }).catch(reject);
//         }
//         return callBack();
//     });
// }
// let list = [];
// for (let i = 0; i <= 10; i++) {
    // list.push(new Promise((resolve) => {
    //     resolve(i);

    // }));
//     list.push(i);
// }





