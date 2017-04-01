'use strict'

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
    var size = 200 * 1024 * 1024;
    var buf = new Buffer(size);
    for (var i = 0; i < size; i++) {
        buf[i] = 0;
    }
    return buf;
};

var total = [];
　
for (var j = 0; j < 10; j++) {
  showMem();
  total.push(useMem());
}
showMem();