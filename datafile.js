// Imports
const config = require('./config.json');
const range = require('range_check');
const fs = require('fs');

class Datafile {

    constructor() {
        // Set date variables
        this.start = new Date();
        this.end = new Date(this.start.getTime() + (1000 * config.iftop.duration));

        // Set and check path
        this.path = this.getPathname();
        this.checkPath();

        // Set and check file with(out) extension
        this.file = this.path + '/' + this.getFilename();
        this.file += (config.data.ext.length > 0) ? '.' + config.data.ext : '';
        this.checkFile();
    }

    getConnections() {
        let json;
        let results = { connections: [] };

        let data = fs.readFileSync(this.file, 'utf-8');
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
                'start': this.start.toISOString(),
                'end': this.end.toISOString(),
                'direction': this.isIntern(str1[1]) ? 'outgoing': 'incoming'
            };
            results.connections.push(json);

            json = {
                'source': str2[0],
                'destination': str1[1],
                'bandwidth': str2[4],
                'start': this.start.toISOString(),
                'end': this.end.toISOString(),
                'direction': this.isIntern(str2[0]) ? 'outgoing': 'incoming'
            };
            results.connections.push(json);
        }

        if (!config.data.keep)
            this.remove();

        return results;
    }

    isIntern(ip) {
        let result = false;
        config.iftop.networks.forEach((network) => {
            if (range.inRange(ip, network))
                result = true;
        });
        return result;
    }

    remove() {
        fs.unlink(this.file, (err) => {
            if (err)
                console.error(err);
        });
    }

    getPathname() {
        return (config.data.keep) ? config.data.path + '/' + this.start.getFullYear() + '-'
            + (this.start.getMonth() + 1) + '-' + this.start.getDate() : '/tmp/ifconnector';
    }

    getFilename() {
        return this.on2(this.start.getHours()) + this.on2(this.start.getMinutes()) + this.on2(this.start.getSeconds()) + '_'
            + this.on2(this.end.getHours()) + this.on2(this.end.getMinutes()) + this.on2(this.end.getSeconds());
    }

    checkPath() {
        if(!fs.existsSync(this.path)) {
            fs.mkdir(this.path);
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

exports.Datafile = Datafile;