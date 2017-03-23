'use strict';

function foo () {
    try {
        console.log(1);
        return 'oh';
        console.log('debug') // not log
    } catch (e) {
        console.error(e)
    } finally {
        console.log(2) // log 2
        return 'log'
    }
    console.log(3) // not log
}

console.log(foo()) // log


// V8-bug 1 2 4 hey 3
async function bar () {
    try {
        console.log(1)
        return await Promise.resolve('hey')
    } finally {
        console.log(2)
        await Promise.resolve('oh')
        console.log(3)
    }
}

bar().then((p) => {
    console.log(4)
    console.log(p)
})