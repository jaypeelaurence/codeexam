const methods = require('../methods');

const cashOutNatural = (input, users, data, commis) => {
  let value;
  let user = null;
  let amount;

  value = methods.getPercentage(data.operation.amount, commis.percents);

  const range = methods.dateRange(data.date);

  const transactions = methods.getTransactions({ input, data, range });
  const weeklySum = methods.weeklySum(transactions);
  const getUser = users.find((userId) => userId === data.user_id);

  if (!getUser) {
    value = 0;

    if (weeklySum > commis.week_limit.amount && transactions.length) {
      amount = data.operation.amount - commis.week_limit.amount;
      value = methods.getPercentage(amount, commis.percents);
    } else if (weeklySum > commis.week_limit.amount) {
      amount = data.operation.amount - commis.week_limit.amount;
      value = methods.getPercentage(amount, commis.percents);
    }

    user = data.user_id;
  } else if (!transactions.length && weeklySum < commis.week_limit.amount) {
    value = 0;
  }

  return ({
    value,
    user,
  });
};

module.exports = cashOutNatural;
