'use strict'


const sleepAsync = (time, callback) => {
    setTimeout(callback, time)
}

const method = {
    queue: [],
    push(asyncFunc) {
        var args = [].slice.call(arguments, 1)
        this.queue.push({
            func: asyncFunc,
            args
        })
    },
    run() {
        var req = this.queue.shift()
        var args = req.args
        var asyncFunc = req.func
        var callback = args[args.length - 1]

        args[args.length - 1] = function (err) {
            console.log('inject some logic')
            callback.apply(null, arguments)
        }

        asyncFunc.apply(null, args)
    }
}

method.push(sleepAsync, 3000, function () {
    console.log('complete async')
})

method.run()