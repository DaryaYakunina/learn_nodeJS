const Square = require('./lib.cjs');
const mySquare = new Square(2);
console.log(`The area of mySquare is ${mySquare.area()}`);

const mySquare2 = new Square(9);
console.log(`The area of mySquare2 is ${mySquare2.area()}`);