// Imports
const config = require('./config.json');
const poller = require('poller');
const fs = require('fs');
const { Elastic } = require('./elastic');
const { Iftop } = require('./iftop');

// Set Poller on
poller('/tmp/ifconnector', (err, poll) => {
    if (err) {
        console.log('Cannot poll the directory : /tmp/ifconnector');
        process.exit(1);
    }
    poll.on('add', (filepath) => {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                received(data);
            }
        });
    })
})

// Define main fonction to do in interval.
let exec;
const fct = function() {
    exec = new Iftop();
};

// Check if duration is 2, 10 or 40 so iftop can works
if(![2, 10, 40].includes(config.iftop.duration)) {
    console.error('Duration must be 2, 10 or 40. Check iftop manual');
    process.exit(2);
}

function received(data) {
    let json;
    let results = { connections: [] };

    fs.readFileSync(this.file, 'utf-8', (err, data) => {
        if (err)
            console.error('Unable to read file where data were saved : ' + this.file);

        console.log(data);
        process.exit(0);
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
        const el = new Elastic(JSON.stringify(results)).send();
    });

}

setInterval(fct, config.iftop.duration * 1000);