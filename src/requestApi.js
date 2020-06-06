const request = require('request-promise');

const requestApi = async _ => {
	let getCashIn;
	let getCashOutNatural;
	let getCashOutLegal;
	let result;

	getCashIn = request('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in');

	getCashOutNatural = request('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural');

	getCashOutLegal = request('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical');

	result = Promise.all([
		getCashIn,
		getCashOutNatural,
		getCashOutLegal
	])

	return result;
}

module.exports = requestApi;