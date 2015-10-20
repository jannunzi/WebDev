var square = require('./square.js');
var s1 = square(99,88);
var s2 = square(66,77);

console.log('Square Modules Index');
console.log(s1);
console.log(s2);
console.log(s1.area());
console.log(s2.area());

s1.setHeight(22);
console.log('S1 Height: ' + s1.getHeight());
s2.setHeight(44);
console.log('S2 Height: ' + s2.getHeight());
