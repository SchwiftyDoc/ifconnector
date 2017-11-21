const config = require('./config.json');
const http = require('http');

exports.Elastic = class {

    // Set Request Options
    static options = {
        host: config.elasticsearch.host,
        port: config.elasticsearch.port,
        path: config.elasticsearch.index
            + '/' + config.elasticsearch.type,
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
            //"Content-Length": Buffer.byteLength(data)
        }
    };

    constructor(data) {
        this.data = data;
        // Set request and handle answers
        const req = http.request(options, (res) => {
            res.on('error', (err) => {
                console.error(err);
            });
            res.on('data', (chunk) => {
                console.log('Elasticsearch saved iftop : ' + this.data.file.getFilename());
                // TODO : replace code from here with an event so it's handled by file class.
                if(!config.data.keep)
                    this.data.file.remove();
            });
        });
    }

    send(data) {
        this.req.write(this.data);
        this.req.end();
    }


}