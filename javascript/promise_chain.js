'use strict'


const fs = require('fs')

// Promise/A 只有一个catch，所以不用考虑闭包带来的问题，只要错误，就会在最新的error_callback中触发
// Promise/A 链中有多个then，要考虑闭包导致的，最后异步触发指向了同一个函数
// 在于哨兵变量的使用
function promisify(fn) {

    return function (path, enc) {

        let deffered = 0
        fn(path, enc, function (err, content) {
            if (err) {
                let reject = handler.error(err)
            } else {
                let resolve = handler[`success_${deffered}`](content)
                ++deffered
                if (resolve) {
                    if (resolve.then) {
                        resolve.then(handler[`success_${deffered}`])
                    }
                    if (resolve.catch) {
                        resolve.catch(handler.error)
                    }
                }
            }
        })

        const handler = {}
        let pending = 0
        const callback = {
            then(successHandler) {
                handler[`success_${pending}`] = successHandler
                ++pending
                return this
            },
            catch(errorHandler) {
                handler.error = errorHandler
            }
        }
        return callback
    }
}

const readFileAsync = promisify(fs.readFile)

readFileAsync('./fs_model.txt', 'utf8')
    .then((content) => {
        console.log(content) // hey
        return readFileAsync('./fs_model.txt')
    })
    .then((content) => {
        console.log(content) // <Buffer 68 65 79>
        return readFileAsync('./fs_model1.txt')
    })
    .then((content) => {
        console.log(content) // not run
    })
    .catch(e => {
        console.error(e) // error not found
    })

// readFileAsync('./fs_model.txt', 'utf8')
//     .then((content) => {
//         console.log(content) // hey
//         return readFileAsync('./fs_model2.txt')
//     })
//     .then((content) => {
//         console.log(content) // not run
//         return readFileAsync('./fs_model.txt')
//     })
//     .then((content) => {
//         console.log(content) // not run
//     })
//     .catch(e => {
//         console.error(e) // error not found
//     })