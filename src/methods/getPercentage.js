const getPercentage = (amount, percent) => (
  (amount * parseFloat(percent)) / 100
);

module.exports = getPercentage;
