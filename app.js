// Imports
const config = require('./config.json');
const { Iftop } = require('./iftop');

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

setInterval(fct, config.iftop.duration * 1000);