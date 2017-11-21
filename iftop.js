// Imports
const config = require('./config.json');
const child = require('child_process');
const { Elastic } = require('./elastic');
const { Datafile } = require('./datafile');

exports.Iftop = class {

    constructor() {
        this.connections = [];
        this.datafile = new Datafile();
        this.execute = child.exec('iftop -i ' + config.iftop.interface + ' -t -n -s ' + config.iftop.duration + ' > ' + this.datafile.filevim)
        this.execute.on('close', (code) => { this.close(code, this.datafile) });
    }

    intern() {

    }

    close(code, file) {

        if(code != 0) {
            console.error('iftop has stopped unexpectidly on code : ' + code);
            process.exit(code);
        }

        console.log(file.getConnections());
        process.exit(0);

        // Send to Elastic search
        const elastic = new Elastic(this);

        // Delete raw data?
        if (!config.data.keep)
            this.file.remove();
    }

};

