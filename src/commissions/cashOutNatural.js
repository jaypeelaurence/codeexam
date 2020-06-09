const methods = require('../methods');

const cashOutNatural = (input, users, data, commis) => {
  let value;
  let user = null;

  value = methods.getPercentage(data.operation.amount, commis.percents);

  const range = methods.dateRange(data.date);
  const transactions = methods.getTransactions({ input, data, range });
  const weeklySum = methods.weeklySum(transactions);
  const getUser = users.find((userId) => userId === data.user_id);

  if (getUser) {
    if (
      !transactions.length && data.operation.amount < commis.week_limit.amount
      && users.find((userId) => userId !== data.user_id)) {
      value = 0;
    }
  } else {
    if (data.operation.amount > commis.week_limit.amount) {
      const amount = data.operation.amount - commis.week_limit.amount;
      value = methods.getPercentage(amount, commis.percents);
    } else if (weeklySum < commis.week_limit.amount) {
      value = 0;
    }

    user = data.user_id;
  }

  return ({
    value,
    user,
  });
};

module.exports = cashOutNatural;
