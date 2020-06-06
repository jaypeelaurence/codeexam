let requestApi = require('./src/requestApi');
let getCommision = require('./src/getCommision');

const App = async dataInput => {
	let commision;
	let result;

	commision = await requestApi(); // request Commission API

	if(commision){
		result = await getCommision(dataInput, commision); // loads and computes the input data commission
	}else{
		result = commision;
	}

	return result;
}

module.exports = App;