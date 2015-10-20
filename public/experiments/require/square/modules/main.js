var square = require('./square.js');
var s1 = square(11,22);
var s2 = square(22,33);

console.log('Square Modules');
console.log(s1);
console.log(s2);
console.log(s1.area());
console.log(s2.area());

s1.setHeight(2);
console.log('S1 Height: ' + s1.getHeight());
s2.setHeight(4);
console.log('S2 Height: ' + s2.getHeight());
