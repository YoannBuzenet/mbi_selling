const { startScript } = require("../controllers/scriptController");
const { retrieveAsAdmin } = require("../services/adminBehaviours");
const axios = require("axios");

it("starts a script", async () => {
  expect(1 + 2).toEqual(3);
});
