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
                ret.queue = ret.queue.concat(promise.queue);
                this.promise = ret;
            } else {
                ret = Promise.resolve(ret)
                ret.queue = ret.queue.concat(promise.queue);
            }
            return;
        }
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
                this.promise = ret;
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

Promise.resolve = function (p) {
    var deferred = new Deferred();
    process.nextTick(deferred.callback(p));
    return deferred.promise;
}

module.exports = function (method) {
    return function () {
        var deferred = new Deferred();
        var args = Array.prototype.slice.call(arguments, 0);
        args.push(deferred.callback());
        method.apply(null, args);
        return deferred.promise;
    }
}