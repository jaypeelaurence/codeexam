const dateRange = (date) => {
  const current = new Date(date);
  const startWeek = new Date(
    current.setDate(current.getDate() - (((current.getDay() + 7) - 1) % 7)),
  );
  startWeek.setHours(0, 0, 0);
  const endWeek = new Date(
    current.setDate((current.getDate() - current.getDay() + 1) + 6),
  );
  endWeek.setHours(23, 59, 59);

  return [startWeek.getTime(), endWeek.getTime()];
};

module.exports = dateRange;
