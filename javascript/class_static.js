'use strict'


class Foo {
    static bar() {
        console.log('hello')
    }

    constructor() {
        this.name = 'kyo'
    }

    log() {
        console.log(this.bar)
    }
}

Foo.bar();

(new Foo()).log();