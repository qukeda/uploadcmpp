var fs = require('fs');
var request = require('request');

var pwd = process.env.PWD;
var tmp = pwd + '/tmp';

console.log('tmp:' + tmp)


fs.readdir(tmp, function(err, data) {
    if (err) {
        console.log('err:' + err);
    } else {
        for (var i = 0, length = data.length; i < length; i++) {
            var dirname = data[i];
            console.log(dirname);

            var data64 = fs.readFileSync(tmp + '/' + dirname, 'base64');
            // console.log(data1)
            var parms = {};
            parms.name = dirname;
            parms.content = data64;

            request.post({ url: 'http://v.cmpp.ifeng.com/Cmpp/runtime/interface_498.jhtml', form: parms }, function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    // console.log('response:' + JSON.stringify(response));

                    console.log('返回值：' + body)
                    var date = new Date();
                    var log = date + '  ' + body + '\n';
                    fs.appendFile('log.txt', log, function(err) {
                        if (err) throw err;
                    })
                }
            })

        }
    }
})





// fs.readFile(pwd + '/tmp/123.jpg', function(err, data) {
//     if (err) {
//         console.log('err:' + err);
//     } else {
//         //var text = data.toString('utf-8');
//         // console.log(text);
//         //var buf = new Buffer(text, 'utf-8')
//         // console.log(buf);
//         //console.log(data);
//         //console.log(data.length + ' bytes');
//     }
// });




// var data = '{"name":123}';

// fs.writeFile('output.txt', data, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('ok.');
//     }
// });
// fs.readFile('output.txt', 'utf-8', function(err, data) {
//     if (err) {
//         console.log('err:' + err);
//     } else {
//      var json = JSON.parse(data);
//         console.log(json.name);
//     }
// });


// fs.stat('output.txt', function (err, stat) {
//     if (err) {
//         console.log(err);
//     } else {
//         // 是否是文件:
//         console.log('isFile: ' + stat.isFile());
//         // 是否是目录:
//         console.log('isDirectory: ' + stat.isDirectory());
//         if (stat.isFile()) {
//             // 文件大小:
//             console.log('size: ' + stat.size);
//             // 创建时间, Date对象:
//             console.log('birth time: ' + stat.birthtime);
//             // 修改时间, Date对象:
//             console.log('modified time: ' + stat.mtime);
//         }
//     }
// });
