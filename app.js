const requestApi = require('./src/requestApi');
const getCommission = require('./src/getCommission');

const App = async (dataInput) => {
  let result;
  let commissions;

  try {
    commissions = await requestApi(); // request Commission API

    if (commissions) {
      result = await getCommission(dataInput, commissions); // loads and computes
    }
  } catch (err) {
    result = err.message;
  }

  return result;
};

module.exports = App;
