const timestamp = (date) => {
  const time = new Date(date);
  time.setHours(0, 0, 0);

  return time.getTime();
};

module.exports = timestamp;
