var express = require("express");
var router = express.Router();
var axios = require("axios");
const { sendEmail } = require("../../controllers/mailController");
const db = require("../../../models");

/*******************************/
/******RESET MAIL FIRST STEP****/
/*******************************/
router.post("/resetPassword", async (req, res) => {
  //Receving the google Token : sending to their server and then doing stuff
  console.log("Receiving mail reset request, step 1");
  let googleToken = req.body.token;
  let usermail = req.body.mail;
  let locale = req.body.locale;

  let config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
  };

  axios
    .post(
      "https://www.google.com/recaptcha/api/siteverify?secret=" +
        process.env.SERVERSIDE_RECAPTCHA_KEY +
        "&response=" +
        googleToken,
      {},
      config
    )
    .then(async (googleResp) => {
      if (googleResp.data.success) {
        console.log("received the OK from google");

        // We need some data to trigger the challenge behaviour on MTGAPI : we get them on our own database.
        const shopDataMbiSelling = await db.User.findOne({
          where: {
            email: usermail,
          },
        });

        if (shopDataMbiSelling === null) {
          res.status(406).json("This shop doesn't exist.");
          return;
        }

        await axios
          .post(process.env.REACT_APP_MTGAPI_URL + "/usermail/challenge", {
            shopId: shopDataMbiSelling.dataValues.idShop,
            mail: usermail,
            shopKey: shopDataMbiSelling.dataValues.shopKey,
          })
          .then((respServ) => {
            console.log(respServ);
            const challenge = respServ.data;
            sendEmail("mailForgotten", null, usermail, { challenge }, locale);
          })
          .catch((e) =>
            console.log(
              e +
                " error when trying to reach MTG API --- " +
                e.message +
                "trying to log error message"
            )
          );

        res.statusCode = 200;
        res.end();
      } else {
        //TODO TRAITER LE CATCH AVEC NOTIF ERROR
        console.log(googleResp);
        res.status(500).json("Message couldn't be posted.");
      }
    })
    .catch((e) => console.log("ERROR IN GOOGLE ASKING", e));
});

router.post("/setNewPassword", async (req, res) => {
  console.log("resting password step 2");
  let googleToken = req.body.token;
  let { challenge, password, mail } = req.body;

  let config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
  };

  //get shopKey from mail here
  // We need some data to trigger the challenge behaviour on MTGAPI : we get them on our own database.
  const shopDataMbiSelling = await db.User.findOne({
    where: {
      email: mail,
    },
  });

  await axios
    .post(
      "https://www.google.com/recaptcha/api/siteverify?secret=" +
        process.env.SERVERSIDE_RECAPTCHA_KEY +
        "&response=" +
        googleToken,
      {},
      config
    )
    .then((googleResp) => {
      if (googleResp.data.success) {
        //TO DO : RES 200 + NOTIF
        //PING MTGI API WITH THE NEW PASSWORD AND ALL INFOS
        axios
          .post(process.env.REACT_APP_MTGAPI_URL + "/usermail/reset", {
            shopId: shopDataMbiSelling.dataValues.idShop,
            shopKey: shopDataMbiSelling.dataValues.shopKey,
            challenge,
            password,
            mail,
          })
          .catch((e) => console.log("error in step 2 while contacting google"));

        res.status(200).json("Password has been updated.");
      } else {
        //TODO TRAITER LE CATCH AVEC NOTIF ERROR
        console.log("error while contacting google servers", googleResp);
        res.status(500).json("Password couldn't be updated.");
      }
    })
    .catch((e) => console.log("ici LOL", e));
});

module.exports = router;
