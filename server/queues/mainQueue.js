var Queue = require("bull");

// optimalbits.github.io/bull/

var mkmScriptsUpdateQueue = new Queue(
  "MKM Script Update",
  "redis://127.0.0.1:6379"
);

module.exports = {
  mkmScriptsUpdateQueue,
};
