/**
 * Created by sharkyzh on 2016/10/28.
 */

var readLine = require('fs-readline');
var copyTools = require('./util/copyDir');

var res = readLine('./dist.txt');
res.on('line', function (line, idx) {
    copyTools.copy('./updata', line, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log(idx, line+' finished');
})