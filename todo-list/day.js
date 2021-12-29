exports.getDate = function () {
  const date = new Date();
  const day = date.toDateString();
  return day;
};
