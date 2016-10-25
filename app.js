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




