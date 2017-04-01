function showMem() {
    function format(bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB'
    }

    const memory = process.memoryUsage()

    console.log(`
    Process heapTotal: ${format(memory.heapTotal)}
    Process heapUsed: ${format(memory.heapUsed)}
    Process rss: ${format(memory.rss)}
`)
}

var useMem = function () {
    var size = 20 * 1024 * 1024;
    var arr = new Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = 0;
    }
    return arr;
};

var total = [];
　
for (var j = 0; j < 7; j++) {
  showMem();
  total.push(useMem());
}
showMem();