var Queue = require("bull");

// optimalbits.github.io/bull/

var mkmScriptsUpdateQueue = new Queue(
  "MKM Script Update",
  "redis://127.0.0.1:6379"
);

mkmScriptsUpdateQueue.process(async function (job, done) {
  console.log("starting process in main queue");
  // do the script
  done();
});

module.exports = {
  mkmScriptsUpdateQueue,
};
