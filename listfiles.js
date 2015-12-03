var fs = require('fs');

fs.readdir('public',function (a, b) {
    console.log(a);
    console.log(b);
});
