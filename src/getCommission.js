const commissions = require('./commissions');
const methods = require('./methods');

const users = [];

const getCommission = (input, commis) => (
  input.map((data, key) => {
    let value;
    let natural;

    switch (data.type) {
      case 'cash_in':
        value = commissions.cashIn(data, commis.cashIn);
        break;
      default: // cash_out
        switch (data.user_type) {
          case 'natural':
            natural = commissions.cashOutNatural(
              input,
              users,
              { ...data, key },
              commis.cashOutNatural,
            );

            if (natural.user) {
              users.push(natural.user);
            }

            value = natural.value;
            break;
          default: // juridical
            value = commissions.cashOutJuridical(data, commis.cashOutJuridical);
            break;
        }
        break;
    }

    return methods.rounding(value);
  })
);

module.exports = getCommission;
