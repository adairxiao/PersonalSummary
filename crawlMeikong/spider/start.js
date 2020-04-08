

const request = require('request');
// 请求

let url = 'https://app-api413.moko.cc/index/indexModelList';
let reqBody = { 'page': 1, 'style_id': '' };

function query(method, url, reqParameter = null, img = [false, null]) {
    // 使用Promise封装请求

    // 请求的基本数据
    let options = {
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



    return new Promise((resolve, reject) => {
        console.log(options);
        
        request(options, (error, response, body) => {
            if (response === undefined || response.statusCode == 200) {
                // const info = JSON.parse(body);
                // console.log("model:" + info.data);
                // 获取最大页码
                // last_page=info.data.last_page;
                // console.log(last_page);
                console.log(JSON.parse(body));
                console.log(response);
                resolve(response);
            } else {
                reject(error)
            }
        })
    }).catch(error => {
        console.log(error);

    });
}







console.log(query('POST', url, reqParameter = reqBody));
