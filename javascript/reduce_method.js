const only = (obj, keys) => {
    return keys.reduce((ret, key) => {
        if (!obj[key]) return ret
        ret[key] = obj[key]
        return ret
    }, {})
}

// only usage
const obj = { name: 'kyo', age: 23 }
console.log(only(obj, ['age'])) // { age: 23 }

const flatten = array => array.reduce(
    (acc, value) => acc.concat(
        Array.isArray(value) ? flatten(value) : value
    ), []
)

// flatten usage
let arr = [1, [2, 3], [[4, 5]]]
console.log(flatten(arr)) // [1, 2, 3, 4, 5]

// reduce param
arr = [1, 2, 4]
const num = arr.reduce((acc, value, index, array) => {
    console.log(array)
    console.log('current index is %d', index)
    return acc + value
}, 0)
console.log('num is %d', num)