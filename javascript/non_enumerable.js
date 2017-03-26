// js 可枚举 与 不可枚举例

var o = { a: 1, b: 2 }

o.c = 3

Object.defineProperty(o, 'd', {
    value: 4,
    enumerable: false
})

console.log(o.d) // 4
console.log(o) // { a: 1, b: 2, c: 3 }

console.log(Object.getOwnPropertyNames(o)) // 自身所有属性 包括不可枚举 ['a', 'b', 'c', 'd']