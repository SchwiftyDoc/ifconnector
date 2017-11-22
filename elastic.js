const config = require('./config.json');
const http = require('http');

exports.Elastic = class {


    constructor(data) {

        // Set data and HTTP Request options
        const options = {
            host: config.elasticsearch.host,
            port: config.elasticsearch.port,
            path: config.elasticsearch.index
                + '/' + config.elasticsearch.type,
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Content-Length": Buffer.byteLength(data)
            }
        };

        // Set request and handle answers
        const req = http.request(options, (res) => {
            res.on('error', (err) => {
                console.error(err);
            });
            res.on('data', (data) => {
                //console.log(data.toString());
            })
        });

        req.write(data);
        req.end();
    }

}