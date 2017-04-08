'use strict'


const tls = require('tls');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./o.key'),
    cert: fs.readFileSync('./o.crt'),
    requestCert: true,
    ca: [ fs.readFileSync('./ca/ca.crt') ]
};

const server = tls.createServer(options, (stream) => {
    console.log(
        'server connected ', stream.authorized ? 'success' : 'fail'
    );

    stream.write('welcome\n');
    stream.setEncoding('utf8');
    stream.pipe(stream);  
})

server.listen(8000, () => console.log('server bound 8000'));