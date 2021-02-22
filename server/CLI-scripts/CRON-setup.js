var CronJob = require("cron").CronJob;
const { pingMTGJSON } = require("./checkMTGJSONVersion");

async function launchCrons() {
  var dailyMTGJSOnCheck = new CronJob(
    "0 8 * * *",
    pingMTGJSON,
    null,
    true,
    "Europe/Paris"
  );

  // Eventually launch here renew MTG Price

  // cron launch
  dailyMTGJSOnCheck.start();
}

launchCrons();
