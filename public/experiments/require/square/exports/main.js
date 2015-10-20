
var square = require('./square.js');
var square2 = require('./square.js');

square.setWidth(11);
console.log('Width: '+ square.getWidth());

square.setHeight(22);
console.log('Height: '+ square.getHeight());

console.log('Area: ' + square.area());
console.log('Perimeter: ' + square.perimeter());


square2.setWidth(33);
console.log('Width: '+ square2.getWidth());

square2.setHeight(44);
console.log('Height: '+ square2.getHeight());

console.log('Area: ' + square2.area());
console.log('Perimeter: ' + square2.perimeter());

console.log('Area: ' + square.area());
console.log('Perimeter: ' + square.perimeter());
