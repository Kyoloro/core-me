
let i = 0;
let j = 0;

while (i < 5) {
    i++;

    if (i === 3) {
        continue;
    }

    j += 1
}

console.log(i) // 5
console.log(j) // 4

let r = 0
for (let z = 0; z <= 5; z++) {
    if (z === 3) {
        continue;
    }
    r += 1
}

console.log(r) // 5 instead of 6

let m = 0
let n = 8
// label
label_1: while (m < 4) {
    console.log('m: %d', m);
    m += 1;

    label_2: while (n > 4) {
        console.log('n: %d', n);
        n -= 1

        if ((n % 2) === 0) continue label_2;
        console.log(n + ' is 奇数');
    }

    console.log('m = %d', m);
    console.log('n = %d', n);
}