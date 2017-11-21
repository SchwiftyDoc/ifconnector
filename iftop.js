// Imports
const config = require('./config.json');
const child = require('child_process');
const { Elastic } = require('./elastic');
const { Datafile } = require('./datafile');

exports.Iftop = class {

    constructor() {
        this.connections = [];
        this.datafile = new Datafile();
        this.execute = child.exec('iftop -i ' + config.iftop.interface + ' -t -n -s ' + config.iftop.duration + ' > ' + this.datafile.file);
    }

};

