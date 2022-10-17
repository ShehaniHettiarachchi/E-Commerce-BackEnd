const express = require("express");
const router = express.Router();
const { Order } = require("../models/OrderModel");

//Localhost:8070/order/ ----> display purchase history

http: router.route("/").get((req, res) => {
    Order.find()
      .then((order) => {
        res.json(order);
      })
      .catch((err) => {
        console.log(err);
      });
});

module.exports = router;