const express = require("express");
const router = express.Router();
const { Purchase } = require("../models/PurchaseModel");

//Localhost:8070/purchase/ ----> display purchase history

http: router.route("/").get((req, res) => {
    Purchase.find()
      .then((purchase) => {
        res.json(purchase);
      })
      .catch((err) => {
        console.log(err);
      });
})

//localhost:8070/purchase/newPurchase
router.route("/newPurchase").post((req, res) => {
  const {
    email,
    product,
    quantity,
    date,
  } = req.body;

  const newPurchase = new Purchase({
    email,
    product,
    quantity,
    date,
  })

  newPurchase.save().then(() => {
    res.json("Purchase done successfully")
}).catch(err => {
    console.log(err);
})
})

module.exports = router;