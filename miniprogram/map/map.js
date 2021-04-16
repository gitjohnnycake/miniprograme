// 引入SDK核心类
var QQMapWX = require('./qqmap-wx-jssdk');
 
// 实例化API核心类
var getToilet = new QQMapWX({
    key: '2XVBZ-DAICG-PD4QJ-IPYIL-3H4ES-3SBY4' // 必填
});
 
// 调用接口
demo.search({
    keyword: '酒店',
    success: function(res) {
        console.log(res.status, res.message);
    },
    fail: function(res) {
        console.log(res.status, res.message);
    },
    complete: function(res) {
        console.log(res.status, res.message);
    }
});