const express = require('express');
const router = require('./router.js');
const bodyParser = require('body-parser');
const template = require('art-template');
const path = require('path');
const app = express();

/*启动静态加载文件 */
app.use('/www',express.static(path.join(__dirname, 'img')));


/*设置模板引擎*/

// 设置路径w
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎
app.set('views engine', 'art');
//使用express兼容art-tmplate
app.engine('art', require('express-art-template'));

//处理请求参数
//挂载参数处理中间间（post）
app.use(bodyParser.urlencoded({ extended: false }));
//处理json格式的参数
app.use(bodyParser.json());


app.use(router);

app.listen(3000,()=>{
    console.log('running...');
    
});
