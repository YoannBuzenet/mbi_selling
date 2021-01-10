var Queue = require("bull");
const { startScript } = require("../controllers/scriptController");
const db = require("../../models/index");

// optimalbits.github.io/bull/

var mkmScriptsUpdateQueue = new Queue(
  "MKM Script Update",
  "redis://127.0.0.1:6379"
);

mkmScriptsUpdateQueue.process(async function (job, done) {
  console.log("starting process in main queue");
  //   console.log("state of the queue", mkmScriptsUpdateQueue);

  try {
    await startScript(
      job.data.idShop,
      job.data.idScript,
      job.data.isTest,
      job.data.shopData,
      job.data.locale,
      job.data.formats,
      job.data.jwt,
      job.data.hasPricedBasedOn
    );
    console.log("script has finished");
  } catch (e) {
    //TODO mail yoann avec l'erreur

    // Marking Script as available
    await db.Script.markAsNotRunning(job.data.idScript);
    console.error("error in the script execution", e);
  }

  done();
});

module.exports = {
  mkmScriptsUpdateQueue,
};
