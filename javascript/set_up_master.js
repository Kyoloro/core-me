const cluster = require('cluster')


cluster.setupMaster({
    exec: './worker.js'
})

cluster.on('listening', () => {
    console.log('worker listening .')
})

const cpu = require('os').cpus()
console.log(cpu.length)

for (let i = 0; i < cpu.length; i++) {
    cluster.fork()
}