const request = require('request-promise');

const requestApi = async () => {
  let result;
  let getCashIn;
  let getCashOutNatural;
  let getCashOutLegal;

  try {
    getCashIn = await request({
      method: 'GET',
      url: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in',
      json: true,
    });

    getCashOutNatural = await request({
      method: 'GET',
      url: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural',
      json: true,
    });

    getCashOutLegal = await request({
      method: 'GET',
      url: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical',
      json: true,
    });

    result = {
      cashIn: getCashIn,
      cashOutNatural: getCashOutNatural,
      cashOutJuridical: getCashOutLegal,
    };
  } catch (err) {
    result = err;
  }

  return result;
};

module.exports = requestApi;
