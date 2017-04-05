'use strict'


const dgram = require('dgram')
const socket = dgram.createSocket('udp4')


socket.on('error', (err) => {
    console.log(err)
    socket.close()
})

socket.on('message', (msg, rinfo) => {
    console.log(msg.toString('utf8'))
})

socket.on('listening', () => {
    console.log(socket.address())
})

socket.bind(41234)