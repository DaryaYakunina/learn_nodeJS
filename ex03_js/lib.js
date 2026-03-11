class Square {
  constructor(width) {
    this.width = width;
  }

  area() {
    return this.width ** 2;
  }
};

const size1 = 5;
const size2 = 7;

const print = (msg, value) => {
  console.log (`${msg}, ${value}`);
};

export {Square, size1, size2, print};