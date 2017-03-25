'use strict'


const Q = require('./promise_chain_module')
const fs = require('fs')

const readFileAsync = Q(fs.readFile)

readFileAsync('./fs_model.txt', 'utf8')
    .then((content) => {
        console.log(content) // log
    })