const methods = require('../methods');

const cashOutJuridical = (data, commis) => {
  let value;

  value = methods.getPercentage(data.operation.amount, commis.percents);

  if (value <= commis.min.amount) {
    value = 0;
  }

  return value;
};

module.exports = cashOutJuridical;
