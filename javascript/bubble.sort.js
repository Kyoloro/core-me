var compare = function (x, y) {
    return x - y;
};

var swap = function (a, i, j) {
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
};

var bubbleSort = function (array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length - i - 1; j++) {
            if (compare(array[j], array[j + 1]) > 0) {
                swap(array, j, j + 1);
            }
        }
    }
}

var sort = [23, 20, 12, 288, 2]

bubbleSort(sort)
console.log(sort)
