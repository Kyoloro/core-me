'use strict'


async function fn() {
    // Promise.resolve('hi')
    // return Promise.reject('e')
    return new Error('error')
}

// bar()

fn().then(d => console.log(d)).catch(e => console.error(e))