/*业务模块 */
const request = require('request');
const https = require('https');
var pool = https.Agent({ keepAlive: true });
const chunk = require('chunk');


const fs = require('fs');
const path = require('path');
const db = require('./db.js');


// 入口
// async function getModelList(list){
//     let res = await Promise.all(list);
// }





exports.modleList = (req, res) => {

    let url = 'https://app-api413.moko.cc/index/indexModelList';
    let reqBody = { 'page': 1, 'style_id': '' };

    function query(method, url, reqParameter = null, img = [false, null]) {
        // 使用Promise封装请求

        // 请求的基本数据
        let options = null;

        if (img[0]) {
            // 请求图片
            options = {
                url: url,
                method: 'GET',
                timeout: 5000,
            };

            return new Promise((resolve, reject) => {
                request(options, (error, response) => {
                    if (response === undefined || response.statusCode == 200) {
                        // 返回图片地址:/user_id.jpg
                        resolve(img[1] + '.jpg');
                    } else {
                        reject(error)
                    }
                }).pipe(fs.createWriteStream(path.join(__dirname, 'img', img[1] + '.jpg')))
            }).catch(error => {
                console.log('err:' + error);
            });
        } else {
            if (method == 'POST') {
                options = {
                    url: url,
                    method: 'POST',
                    agent: false,
                    headers: {
                        'Host': 'app-api413.moko.cc',
                        'Connection': 'keep-alive',
                        'If-None-Match': "8f65fa41ecf5ee98dc395fa20e997c3476396f1a",
                        'Accept': '*/*',
                        'User-Agent': 'Moko/5.0.5 (iPhone; iOS 13.3.1; Scale/3.00)',
                        'Accept-Language': 'zh-Hans-CN;q=1',
                        'Content-Length': 16,
                        'Accept-Encoding': 'gzip, deflate, br'
                    },
                    form: reqParameter,
                    timeout: 5000
                };
            } else if (method == 'GET') {
                options = {
                    url: url,
                    // baseUrl: 'https://app-api413.moko.cc/account/modelInfoDetail',
                    method: 'GET',
                    agent: false,
                    headers: {
                        'Host': 'app-api413.moko.cc',
                        'Connection': 'keep-alive',
                        'Accept': '*/*',
                        'User-Agent': 'Moko/5.0.5 (iPhone; iOS 13.3.1; Scale/3.00)',
                        'Accept-Language': 'zh-Hans-CN;q=1',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLWFwaTQxMy5tb2tvLmNjXC9cL2xvZ2luXC9jb2RlTG9naW4iLCJpYXQiOjE1ODU1NjE5NDEsImV4cCI6MTU4NjI4MTk0MSwibmJmIjoxNTg1NTYxOTQxLCJqdGkiOiJDdFlzb1c3Ykt6ZlAwTkxIIiwic3ViIjozODA1MjMwLCJwcnYiOiJjOGJmMTVlNTgyOGU2ZjBmYjJlODI2MzUxOWNlZDg4Y2Y4ZWYyNDBmIn0.G8ln9TKCyvpvIwhqqiK-bCjaoUBVCKTTRX2Y0b3rnOY',
                        'Accept-Encoding': 'gzip, deflate, br'
                    },
                    timeout: 5000,
                    qs: reqParameter
                };
            }



            return new Promise((resolve, reject) => {
                console.log(options);
                request(options, (error, response, body) => {
                    console.log("response", response);


                    if (response === undefined) {
                        // const info = JSON.parse(body);
                        // console.log("model:" + info.data);
                        // 获取最大页码
                        // last_page=info.data.last_page;
                        // console.log(last_page);

                        reject();

                    } else if (response.statusCode == 200) {
                        resolve(response);
                    } else {
                        reject(error);
                    }
                })
            }).catch(error => {
                console.log('err:' + error);

            });
        }




    };

    function sleep(time = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        })
    };



    function writdb(data) {

        return new Promise((resolve, reject) => {
            let sql = 'insert IGNORE  into meikong_info set?';
            db.base(sql, data, (result) => {
                if (result.affectedRows === 1) {
                    resolve();
                }
            });
        }).catch(error => {
            console.log('err:' + error);

        });
    }

    function sequence(promises) {

        return new Promise((resolve, reject) => {
            let i = 0;
            const result = [];
            function callBack() {
                // console.log(i);
                // console.log(promises.length-1);
                return promises[i]().then((res) => {
                    i += 1;
                    // console.log("result：", res);
                    result.push(res);
                    if (i === promises.length) {
                        resolve(result);
                    }
                    callBack();
                }).catch(reject);


            }
            return callBack();
        });
    }
    //加入数组 
    function initArray(last_page) {
        let i = 0;
        let list = new Array(last_page);
        for (; i <= last_page - 1; i++) {
            list[i] = i + 1;
        }

        return new Promise((resolve) => {
            resolve(list);
        })
    }


    async function getBaseInfo() {
        let getPageInfo = await query('POST', url, reqBody);
        // console.log(getPageInfo);

        const last_page = Math.round(JSON.parse(getPageInfo.body).data.last_page);


        // last_page = 8;
        let pageArray = await initArray(last_page);

        return pageArray
    }


    getBaseInfo().then((async (list) => {
        let i = 0;

        console.log("开始分组");
        console.log(chunk(list, 10));

        // 分组并行
        await sequence(chunk(list, 10).map((number) => async () => {


            console.log("number", number);

            // await sleep(Math.random() * 5000);
            await Promise.all(number.map(async (currentPage) => {
                let time = Math.random() * (1000 * 60 * 1.1);
                // let time = Math.random() *5000;
                console.log(i+"----组-time：" + time);
                i++;
                // await sleep(time);
                // console.log("page=" + time, current_page);





                // console.log(date.getMilliseconds(),reqBody.page)
                // await sequence(number.map((currentPage) => async () => {






                let modelInfo = await query('POST', url, { 'page': currentPage, 'style_id': '' });

                let currentPageModels = JSON.parse(modelInfo.body).data.data;

                console.log(currentPageModels);
                



                // console.log("currentPageModels", currentPageModels);
                /*
                await sequence(currentPageModels.map((currentModels) => async () => {
                    // console.log("currentModels",currentModels);
                    let time = Math.random() * (1000 * 60 * 1.2);
                    await sleep(time);
                    let userId = { 'model_id': currentModels.user_info.user_id };
                    let userInfoUrl = 'https://app-api413.moko.cc/account/modelInfo';
                    // let modelInfoRespon =await query('GET',userInfoUrl,userId);
                    let user_url = currentModels.user_logo;
                    // console.log("结束");

                    await Promise.all([await query('GET', userInfoUrl, userId), await query('GET', user_url, reqParameter = null, img = [true, userId.model_id])]).then(results => {
                        console.log(results[0].body);
                        let data = {};
                        data.user_id = currentModels.user_info.user_id;
                        data.nick_name = currentModels.user_info.nick_name;
                        data.user_logo = results[1];
                        data.created_at = currentModels.user_info.created_at;
                        data.user_phone = currentModels.user_phone;
                        data.user_birthday = currentModels.user_info.user_birthday;
                        data.user_gender = currentModels.user_info.user_gender;
                        data.user_type_text = JSON.parse(results[0].body).data.user_type_text;
                        data.height = currentModels.user_stature.height;
                        data.weight = currentModels.user_stature.weight;
                        data.city_name = currentModels.user_info.city_name;

                        // console.log(data);

                        // 写入数据库操作
                        // console.log(1);

                        writdb(data);


                    }

                    );
                    // let modelInfoDetail=JSON.parse(modelInfoRespon.body);
                    // console.log(modelInfoDetail);

                }));
                */

                // }));

            }));



            // 并发处理
        }));






    })).catch(err => {
        console.log("getBaseInfo", err);
    }
    );








};




