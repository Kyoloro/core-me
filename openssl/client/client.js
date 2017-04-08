'use strict'


const tls = require('tls');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./client.key'),
    cert: fs.readFileSync('./client.crt'),
    ca: [ fs.readFileSync('../ca/ca.crt') ]
};

const stream = tls.connect(8000, options, () => {
    console.log(
        'client connected ',
        stream.authorized ? 'success' : 'fail'
    );

    process.stdin.pipe(stream);
});

stream.setEncoding('utf8');

stream.on('data', data => {
    console.log(data)
});
stream.on('end', () => {
    
})