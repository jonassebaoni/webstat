const getWeekOfYear = (date) => {
  const firstJanuary = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((((date - firstJanuary) / 86400000) + firstJanuary.getDay() + 1) / 7);
};

const getDayOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export { getWeekOfYear, getDayOfYear };
