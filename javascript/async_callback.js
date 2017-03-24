// 闭包 偏函数
const _async = (fns) => {
    let count = 0
    let cbAll
    let arr = []

    fns.forEach((fn, i) => {
        fn((err, result) => {
            ++count
            arr[i] = result
            if (count === fns.length) {
                cbAll(arr)
            }
        })
    })

    return {
        then(cb) {
            cbAll = cb
        }
    }
}

// // Async Function
// const fn = (cb) => {
//     setTimeout(() => {
//         cb(null, 1)
//     }, 1000)
// }

// // 封装 实现效果
// console.time()
// _async([
//     fn,
//     fn
// ]).then((arr) => {
//     console.timeEnd() // 1002.782ms
//     console.log(arr) // [1, 1]
// })

const fs = require('fs')

const fn_2 = (callback) => {
    // fs.readFile('./fs_model.txt', 'utf8', (err, content) => {
    //     callback(null, content)
    // })
    process.nextTick(() => {
        callback(null, '1')
    })
}

_async([
    fn_2,
    fn_2
])
.then(arr => {
    console.log(arr)
})

console.log('无同步阻塞')