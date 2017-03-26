'use strict'


const obj = {
    foo() {
        eval(
            `console.log(this.name)`
        )
    },
    name: 'kyo'
}

obj.foo()