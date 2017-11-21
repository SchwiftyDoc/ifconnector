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
        this.execute.on('close', (code) => {
            if (code != 0)
                console.error("Iftop: Error occured.");
            let elastic;
            const data = this.datafile.getConnections();
            data.connections.forEach((conn) => {
                console.log(JSON.stringify(conn));
                elastic = new Elastic(JSON.stringify(conn));
            });
            console.log('Elasticsearch saved : ' + this.datafile.file);
        });
    }

};

