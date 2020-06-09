const rounding = (value) => {
  const splitValue = (value.toFixed(3).split('.'));
  let firstWhole = Number(splitValue[0]);
  let firstPlace;
  let secondPlace;

  if (splitValue[1] && splitValue[1][2] && splitValue[1][2] >= 3) {
    firstPlace = Number(splitValue[1][0], null);
    secondPlace = Number(splitValue[1][1], null);

    secondPlace += 1;

    if (secondPlace >= 10) {
      secondPlace = 0;
      firstPlace += 1;

      if (firstPlace >= 10) {
        firstPlace = 0;
        firstWhole += 1;
      }
    }

    splitValue[0] = firstWhole;
    splitValue[1] = `${firstPlace}${secondPlace}`;
  }

  return (Math.round(parseFloat(splitValue.join('.')) * 100) / 100).toFixed(2);
};

module.exports = rounding;
