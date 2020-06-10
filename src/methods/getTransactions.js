const timestamp = require('./timestamp');

const getTransactions = (trans) => trans.input.filter((dat, index) => {
  if (index === 4) {
    // console.log(`${trans.range[0]} <= ${timestamp(dat.date)} <= ${trans.range[1]}`)
  }

  return (
    trans.data.key !== index
  && dat.user_id === trans.data.user_id
  && dat.user_type === 'natural'
  && dat.type === 'cash_out'
  && trans.range[0] <= timestamp(dat.date)
  && timestamp(dat.date) <= trans.range[1]
  );
});

module.exports = getTransactions;
