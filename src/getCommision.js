let dateRange = require('./dateRange');
let formatDate = require('./formatDate');

let userDic = [];

const getCommision = (dataInput, commis) => {
	let values = [];

	dataInput.forEach((data, key) => {
		let value;
		let percent;
		let commission;

		switch(data.type){
			case "cash_in":
				commission = JSON.parse(commis[0]);
				percent = parseFloat(commission.percents) / 100;

				value = data.operation.amount * percent;

				if(value > commission.max.amount){
					value = commission.max.amount;
				}
			break;
			default: // cash_out
				switch(data.user_type){
					case "natural":
						commission = JSON.parse(commis[1]);
						percent = parseFloat(commission.percents) / 100;

						const range = dateRange(data.date);
							
						const transactions = dataInput.filter((dat, index) => (
							key !== index &&
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
					break;
					default: // juridical
						commission = JSON.parse(commis[2]);
						percent = parseFloat(commission.percents) / 100;

						value = data.operation.amount * percent;

						if(value <= commission.min.amount){
							value = 0;
						}
					break;
				}
			break;
		}

		values.push(value.toFixed(2))
	})

	return values;
}

module.exports = getCommision;