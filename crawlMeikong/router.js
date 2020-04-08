const express = require('express');
const router = express.Router();
const Sservice = require('./spiderService.js')
const service = require('./service.js')

// 路由设置
// 爬虫
router.get('/spider',Sservice.modleList);

router.get('/index',service.modelData);




module.exports = router;