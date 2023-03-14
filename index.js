const fs = require('fs');

var args = process.argv.slice(2);

if (args.length < 2) {
    console.log('Usage: node index.js <font file> <font name>');
    process.exit(1);
}

var array = [];
fs.open(args[0], 'r', function (err, fd) {
    if (err)
        throw err;
    var buffer = Buffer.alloc(1);
    while (true) {
        var num = fs.readSync(fd, buffer, 0, 1, null);
        if (num === 0)
            break;
        var hex = buffer.toString('hex');
        if (hex.length === 1) {
            hex = '0' + hex;
        }
        hex = '0x' + hex.toUpperCase();
        array.push(hex);
    }
    var output = '';

    output += '#pragma once\r\r';

    output += `unsigned char ${args[1]}[] = {\r`

    for (var i = 0; i < array.length; i++) {
        output += array[i];
        if ((i + 1) % 16 === 0) {
            output += ',\r';
        } else {
            output += ', ';
        }
    }

    output += '\r};';
 
    fs.writeFileSync(args[1] + ".h", output);
});