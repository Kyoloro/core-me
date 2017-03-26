'use strict'


const Q = require('./promise_chain_module')
const fs = require('fs')

// const readFileAsync = Q(fs.readFile)

// readFileAsync('./fs_model.txt', 'utf8')
//     .then((content) => {
//         console.log('fs')
//         console.log(content) // log
//     })

// const nextTickAsync = Q(process.nextTick)

// nextTickAsync()
//     .then((content) => {
//         console.log('nextTick')
//     })


function sleepCallback (time, callback) {
    setTimeout(callback, time)
}

const sleepAsync = Q(sleepCallback)

sleepAsync(3000)
    .then(() => {
        console.log('sleep 3000')
    })

sleepAsync(1000)
    .then(() => {
        console.log('sleep 1000')
    })