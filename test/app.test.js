const app = require('../app');

const dataInput = require('../data/input'); // change the data input for testable files.

const testArray = [ // testing values for input
  0.06,
  0.90,
  87.00,
  3.00,
  0.30,
  0.30,
  5.00,
  0.00,
  0.00
];

console.log(testArray.map(val => val.toFixed(2)))

test('First Test: data on input.json', () => (
  app(dataInput)
    .then((res) => (
      res.forEach((value, key) => {
        expect(value).toBe(testArray[key].toFixed(2));
      })
    ))
));