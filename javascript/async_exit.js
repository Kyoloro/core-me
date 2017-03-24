'use strict'

function foo (callback) {
    setTimeout(() => {
        callback()
    }, 3000)
}

foo(() => {
    console.log('hey')
})