const fs = require('fs');
const path = require('path');

const app = require('./app');

const dataInput = require('./data/input'); // change the data input for testable files.

app(dataInput)
.then(res => (
	res.forEach(value => console.log(value))
))
.catch(err => console.log(err.message))