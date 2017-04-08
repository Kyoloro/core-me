'use strict'


function foo() {
    for (var i = 0; i <= 4; i++) {
        if (i === 2) {
            return;
        }

        console.log('F!')
    }
}
foo();
console.log('')

function bar() {
    for (var n = 0; n <= 4; n++) {
        if (n === 2) {
            continue;
        }

        console.log('F!');
    }
}
bar();