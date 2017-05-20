'use strict'

const pid = process.pid
let num = 0

process.on('SIGTERM', () => {
    console.log('GOT A SIGTERM ...')
    process.exit(1)
})

setInterval(() => {
    num += 1
    console.log(num)
    if (num === 5) {
        process.kill(pid, 'SIGTERM')
    }
}, 1200)