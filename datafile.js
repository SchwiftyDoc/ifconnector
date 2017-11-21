// Imports
const config = require('./config.json');
const fs = require('fs');

class Datafile {

    constructor() {
        // Set date variables
        this.start = new Date();
        this.end = new Date(this.start.getTime() + (1000 * config.iftop.duration));

        // Set and check path
        this.path = this.getPathname();
        this.checkPath();

        // Set and check file
        this.file = this.path + '/' + this.getFilename();
        this.file += (config.data.ext.length > 0) ? '.' + config.data.ext : '';
        this.checkFile();
    }

    remove() {

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