'use strict'


const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./o.key'),
    cert: fs.readFileSync('./o.crt'),
    ca: [fs.readFileSync('./ca/ca.crt')],
    requestCert: true,
    rejectUnauthorized: true
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('https web server');
}).listen(8000);