const dateRange = require('./dateRange');
const formatDate = require('./formatDate');

const userDic = [];

const cash_in = (data, commis) => {
	let value;
	const commission = JSON.parse(commis);
	const percent = parseFloat(commission.percents) / 100;

	value = data.operation.amount * percent;

	if(value > commission.max.amount){
		value = commission.max.amount;
	}

	return value;
}

const cash_out_natural = (inputData, data, commis) => {
	let value;
	const commission = JSON.parse(commis);
	const percent = parseFloat(commission.percents) / 100;

	const range = dateRange(data.date);
		
	const transactions = inputData.filter((dat, index) => (
		data.key !== index &&
		dat.user_id === data.user_id &&
		dat.user_type === "natural" &&
		dat.type === "cash_out" &&
		range[0] < formatDate(dat.date) &&
		formatDate(dat.date) < range[1]
	));

	const getUser = userDic.find(user => user === data.user_id);

	if(getUser){
		if(transactions.length){
			value = data.operation.amount * percent;
		}else{	
			value = data.operation.amount * percent;

			if(data.operation.amount < commission.week_limit.amount){
				if(userDic.find(user => user !== data.user_id)){
					value = 0;
				}
			}
		}
	}else{
		if(data.operation.amount < commission.week_limit.amount){
			value = data.operation.amount * percent;
		}else{
			let amount = data.operation.amount - commission.week_limit.amount;
			value = amount * percent;
		}

		userDic.push(data.user_id)
	}

	return value;
}

const cash_out_juridical = (data, commis) => {
	let value;
	const commission = JSON.parse(commis);
	const percent = parseFloat(commission.percents) / 100;

	value = data.operation.amount * percent;

	if(value <= commission.min.amount){
		value = 0;
	}

	return value;
}

const getCommision = (dataInput, commis) => {
	const values = [];

	dataInput.forEach((data, key) => {
		switch(data.type){
			case "cash_in":
				value = cash_in(data, commis[0]);
			break;
			default: // cash_out
				switch(data.user_type){
					case "natural":
						value = cash_out_natural(dataInput, {...data, key: key}, commis[1]);
					break;
					default: // juridical
						value = cash_out_juridical(data, commis[2]);
					break;
				}
			break;
		}

		values.push(value.toFixed(2))
	})

	return values;
}

module.exports = getCommision;