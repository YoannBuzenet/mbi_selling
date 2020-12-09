// Awaited date format is "02-26-2012" (english format without hours/m/seconds corresponding to our column in DB, sequelize type : DateOnly)
function isUserSubscribed(dateString) {
  const myDate = dateString.split("-");

  const endSubscribingDate = new Date(
    myDate[2],
    myDate[0] - 1,
    myDate[1]
  ).getTime();

  const today = new Date().getTime();

  return today <= endSubscribingDate;
}

module.exports = {
  isUserSubscribed,
};
