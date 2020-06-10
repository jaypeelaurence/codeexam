const request = require('request-promise');

const requestApi = async () => {
  let result;
  let cashIn;
  let cashOutNatural;
  let cashOutJuridical;

  try {
    cashIn = await request({
      method: 'GET',
      url: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in',
      json: true,
    });

    cashOutNatural = await request({
      method: 'GET',
      url: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural',
      json: true,
    });

    cashOutJuridical = await request({
      method: 'GET',
      url: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical',
      json: true,
    });

    result = {
      cashIn,
      cashOutNatural,
      cashOutJuridical,
    };
  } catch (err) {
    result = err;
  }

  return result;
};

module.exports = requestApi;
