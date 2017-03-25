'use strict'


// 加入队列 来顺序化执行
const fs = require('fs')

var Deferred = function () {
    this.promise = new Promise();
};

Deferred.prototype.resolve = function (obj) {
    var promise = this.promise;
    var handler;

    while ((handler = promise.queue.shift())) {

        if (handler && handler.fulfilled) {
            var ret = handler.fulfilled(obj);
            if (ret && ret.isPromise) {
                ret.queue = promise.queue;
                // this.promise = ret;
                return;
            }
        }
        // console.log(1)
    }
};

Deferred.prototype.reject = function (err) {
    var promise = this.promise
    var handler;

    while ((handler = promise.queue.shift())) {
        if (handler && handler.error) {
            var ret = handler.error(err);
            if (ret && ret.isPromise) {
                ret.queue = promise.queue;
                // this.promise = ret;
                return;
            }
        }
    }
}

Deferred.prototype.callback = function (param) {
    var that = this;

    return function (err, content) {
        if (err) {
            return that.reject(err);
        }
        if (param) {
            that.resolve(param)
        } else {
            that.resolve(content);
        }
    }
}

var Promise = function () {
    this.queue = [];
    this.isPromise = true;
}

Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    var handler = {}
    if (typeof fulfilledHandler === 'function') {
        handler.fulfilled = fulfilledHandler
    }
    if (typeof errorHandler === 'function') {
        handler.errorHandler = errorHandler
    }

    this.queue.push(handler);

    return this;
}

Promise.resolve = function(p) {
    var deferred = new Deferred();
    process.nextTick(deferred.callback(p));
    return deferred.promise;
}

var readFileAsync = function (file, enc) {
    var deferred = new Deferred();
    fs.readFile(file, enc, deferred.callback());
    return deferred.promise;
}

let date = Date.now()
var sleep = function (time) {
    let target = Date.now()
    do { target = Date.now() } while (target - date <= time)
    date = target
}

var sleepAsync = function (time) {
    var deferred = new Deferred();
    setTimeout(deferred.callback('sleepAsync'), time);
    return deferred.promise;
}

Promise.resolve(1)
    .then((content) => {
        console.log(content)
        return readFileAsync('./fs_model.txt', 'utf8')
    })
    .then((content) => {
        console.log(content)
        return readFileAsync('./fs_model.txt', 'utf8')
    })
    .then((content) => {
        console.log(content)
        return sleepAsync(5000)
    })
    .then((content) => {
        console.log(content)
        return readFileAsync('./fs_model.txt', 'utf8')
    })
    .then((content) => {
        console.log(content)
    })

// sleep(5000)