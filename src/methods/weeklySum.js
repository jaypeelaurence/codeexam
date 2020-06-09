const weeklySum = (transactions) => (
  transactions.reduce((a, b) => a + b.operation.amount, 0)
);

module.exports = weeklySum;
