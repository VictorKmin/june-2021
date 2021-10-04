const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);

async function read() {
    let buffer = readFilePromise(`${__dirname}/app.js`);

    console.log(buffer.toString());

    return xcdsd();
}


read()