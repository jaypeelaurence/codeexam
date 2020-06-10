const app = require('../app');

const dataInput = require('../data/input2'); // change the data input for testable files.

const testArray = [ // testing values for input2
  0.03,
  0.10,
  0.00,
  1.00,
  0.04,
  0.05,
  0.06,
  0.06,
  0.30,
  0.06
];

console.log(testArray.map(val => val.toFixed(2)))

test('Second Test: data on input2.json', () => (
  app(dataInput)
    .then((res) => (
      res.forEach((value, key) => {
        expect(value).toBe(String(testArray[key].toFixed(2)));
      })
    ))
));
