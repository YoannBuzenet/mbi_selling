// Awaited date format is "02-26-2012" (english format without hours/m/seconds corresponding to our column in DB, sequelize type : DateOnly)
function isUserSubscribed(dateString) {
  myDate = dateString.split("-");

  var endSubscribingDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);

  const today = new Date().getTime();
  console.log(newDate.getTime());

  return today <= endSubscribingDate;
}

module.exports = {
  isUserSubscribed,
};
