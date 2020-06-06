const fs = require('fs');
const path = require('path');

const app = require('./app');

const dataInput = require('./data/input'); // change the data input for testable files.

const testArray = [ // testing values
	0.06,
	0.90,
	87.00,
	3.00,
	0.30,
	0.30,
	5.00,
	0.00,
	0.00
]

test('Test data on input.json', () => (
	app(dataInput)
	.then(res => (
		res.forEach((value, key) => {
			expect(value).toBe(String(testArray[key]))
		})
	))
	.catch(err => {
		
	})
))