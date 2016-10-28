/**
 * Created by sharkyzh on 2016/10/28.
 */

var fs = require('fs');
var mkdirp = require('mkdirp');

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
    fs.stat(dist, function (err, stat) {
        if (err == null) {
            if (stat.isDirectory()) {
                // console.log('文件夹已存在，开始拷贝！');
                _copy(null, src, dist);
            } else if (stat.isFile()) {
                console.log('文件存在');
            } else {
                console.log('路径存在，但既不是文件，也不是文件夹');
                //输出路径对象信息
                console.log(stat);
            }
        } else if (err.code === 'ENOENT') {
            // console.log(err.name);
            // console.log('路径不存在，创建文件夹！');
            mkdirp(dist, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    _copy(null, src, dist);
                }
            });
        } else {
            console.log('出现错误：' + err);
        }
        
    });
    
    function _copy(err, src, dist) {
        if (err) {
            callback(err);
        } else {
            fs.readdir(src, function (err, paths) {
                if (err) {
                    callback(err)
                } else {
                    paths.forEach(function (path) {
                        var _src = src + '/' + path;
                        var _dist = dist + '/' + path;
                        fs.stat(_src, function (err, stat) {
                            if (err) {
                                callback(err);
                            } else {
                                // 判断是文件还是目录
                                if (stat.isFile()) {
                                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                                } else if (stat.isDirectory()) {
                                    // 当是目录是，递归复制
                                    copyDir(_src, _dist, callback)
                                }
                            }
                        })
                    })
                }
            })
        }
    }
}

exports.copy = copyDir;