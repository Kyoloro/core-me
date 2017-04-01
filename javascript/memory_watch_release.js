const arr = []
function foo(params) {
    arr.push(params)
}
function foo_2 () {
    arr.shift()
}

function sleep() {
    return new Promise((resolve) => {
        setTimeout(resolve, 100)
    })
}

async function bar() {
    try {
        console.log(process.memoryUsage())
        for (let i = 0; i <= 400; i++) {
            foo('1')
            // console.log(`push ${i + 1}`)
            // await sleep()
        }
        // console.log(arr)
        console.log(process.memoryUsage())

        for (let i = 0; i <= 400; i++) {
            foo_2()
            // console.log(`shift ${i + 1}`)
            // await sleep()
        }
        // console.log(arr)
        console.log(process.memoryUsage())
    } catch (e) {
        console.error(e)
    }
}

bar()