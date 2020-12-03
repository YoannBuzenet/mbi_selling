var Queue = require("bull");
const { startScript } = require("../controllers/scriptController");

// optimalbits.github.io/bull/

var mkmScriptsUpdateQueue = new Queue(
  "MKM Script Update",
  "redis://127.0.0.1:6379"
);

mkmScriptsUpdateQueue.process(async function (job, done) {
  console.log("starting process in main queue");
  //   console.log("state of the queue", mkmScriptsUpdateQueue);

  try {
    startScript(
      job.data.idShop,
      job.data.idScript,
      job.data.isTest,
      job.data.shopData,
      job.data.locale,
      job.data.formats
    );
  } catch (e) {
    console.log("error in the script execution", e);
  }

  console.log("script has finished");

  done();
});

module.exports = {
  mkmScriptsUpdateQueue,
};
