const getWeekFromDate = (date) => {
  const firstJanuary = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((((date - firstJanuary) / 86400000) + firstJanuary.getDay() + 1) / 7);
};

export { getWeekFromDate };
