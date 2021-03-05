// Awaited date format is "02-26-2012" (english format without hours/m/seconds corresponding to our column in DB, sequelize type : DateOnly)
function isUserSubscribed(dateString) {
  if (dateString === null) {
    return false;
  }
  const myDate = dateString.split("-");

  const endSubscribingDate = new Date(
    myDate[0],
    myDate[1] - 1,
    myDate[2]
  ).getTime();

  console.log("subscription date", endSubscribingDate);
  console.log("today", new Date().getTime());
  console.log("comparison", today <= endSubscribingDate);

  const today = new Date().getTime();

  return today <= endSubscribingDate;
}

module.exports = {
  isUserSubscribed,
};
