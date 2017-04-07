'use strict'


const net = require('net')

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        socket.write('hi\n')
    })

    socket.on('end', () => {
        console.log('socket close')
    })

    socket.write('tcp socket connect success ...\n')
})

server.listen('/tmp/echo2.sock', () => {
    console.log('tcp server start at port 8888')
})