// Imports
const config = require('./config.json');
const child = require('child_process');
const { Elastic } = require('./elastic');
const { Datafile } = require('./datafile');

exports.Iftop = class {

    constructor() {
        this.connections = [];
        this.datafile = new Datafile();
        this.execute = child.exec('/usr/sbin/iftop -i ' + config.iftop.interface + ' -t '
            + (config.data.byte) ? '-B ':'' + '-n -s ' + config.iftop.duration + ' > ' + this.datafile.file);
        this.execute.on('close', (code) => {
            if (code != 0)
                console.error("Iftop: Error occured. Check Path variable");

            let elastic;
            const data = this.datafile.getConnections();
            data.connections.forEach((conn) => {
                elastic = new Elastic(JSON.stringify(conn));
            });
            console.log('Elasticsearch saved : ' + this.datafile.file);
        });
    }

};