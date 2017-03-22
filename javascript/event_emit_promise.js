'use strict'

const EventEmitter = require('events')
const fs = require('fs')

class MyEvent extends EventEmitter {
    then(fullfilledHandler) {
        this.once('result', fullfilledHandler)
        return this
    }
    catch(errorHandler) {
        this.once('error', errorHandler)
    }
 }

const promisify = (read) => {
    let readAsync = (filepath, encode) => {
        const ep = new MyEvent()
        read(filepath, encode, (err, content) => {
            if (err) {
                ep.emit('error', err)
            } else {
                ep.emit('result', content)
            }
        })
        // console.log(ep.catch)
        return ep
    }
    return readAsync
}


// Promise
const readFileAsync = promisify(fs.readFile)

readFileAsync('./package.json', 'utf8')
    .then((content) => {
        console.log(content) // package json
    })
    .catch(e => {
        console.error(e)
    })

readFileAsync('./unknow_file', 'utf8')
    .then((content) => {
        console.log(content) 
    })
    .catch(e => {
        console.error(e) // not found file
    })

