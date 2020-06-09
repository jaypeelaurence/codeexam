const methods = require('../methods');

const cashIn = (data, commis) => {
  let value;

  value = methods.getPercentage(data.operation.amount, commis.percents);

  if (value > commis.max.amount) {
    value = commis.max.amount;
  }

  return value;
};

module.exports = cashIn;
