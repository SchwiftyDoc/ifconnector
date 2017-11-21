// Imports
const config = require('./config.json');
const fs = require('fs');

exports.File = class {

    constructor(keep) {
        // Set date variables
        this.start = new Date();
        this.end = new Date(this.start.getTime() + (1000 * config.duration));

        // Set and check path
        if (keep) {
            this.path = this.getPathname();
            this.checkPath();
        } else {
            this.path = '/tmp';
        }

        // Set and check file
        this.file = this.path + '/' + this.getFilename();
        this.file += (config.data.ext.length > 0) ? '.' + config.data.ext : '';
        this.checkFile();
    }

    getConnections() {
        let json;
        let results = { connections: [] };

        fs.readFileSync(this.file, (err, data) => {
            if (err)
                console.error('Unable to read file where data were saved : ' + this.file);

            const strr = data.toString().split('\n');
            for (let u = 3; u < 23; u += 2) {
                let str1 = strr[u].trim();
                str1 = str1.replace(/\s\s+/g, ' ');
                str1 = str1.split(' ');
                let str2 = strr[u+1].trim();
                str2 = str2.replace(/\s\s+/g, ' ');
                str2 = str2.split(' ');

                json = {
                    'source': str1[1],
                    'destination': str2[0],
                    'bandwidth': str1[5],
                    'from': start.toISOString(),
                    'to': end.toISOString()
                };
                results.connections.push(json);

                json = {
                    'source': str2[0],
                    'destination': str1[1],
                    'bandwidth': str2[4],
                    'from': start.toISOString(),
                    'to': end.toISOString()
                };
                results.connections.push(json);
            }
        });

        return results;
    }

    remove() {

    }

    getPathname() {
        return config.data.path + '/' + this.start.getFullYear() + '-'
            + (this.start.getMonth() + 1) + '-' + this.start.getDate();
    }

    getFilename() {
        return this.on2(this.start.getHours()) + this.on2(this.start.getMinutes()) + this.on2(this.start.getSeconds()) + '_'
            + this.on2(this.end.getHours()) + this.on2(this.end.getMinutes()) + this.on2(this.end.getSeconds());
    }

    checkPath() {
        if(!fs.existsSync(this.path)) {
            console.log('The path for the data has been created: ' + this.path);
        }
    }

    checkFile() {
        if(!fs.existsSync(this.file)) {
            fs.closeSync(fs.openSync(this.file, 'w'));
        } else {
            console.error(this.file + ' already exists !');
            process.exit(2);
        }
    }

    on2(num) {
        return (num<10?'0':'') + num;
    }

};