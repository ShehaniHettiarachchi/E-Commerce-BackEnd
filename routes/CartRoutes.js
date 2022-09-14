const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Cart } = require("../models/CartModel");

//Localhost:8070/cart/addCart
http: router.route("/addCart").post((req, res) => {
    // const productName = req.body.productName;
    // const productPrice = req.body.productPrice;
    // const productImage = req.body.productImage;
    // const quantity = req.body.quantity;
    // const userId = req.body.userId;
    // const productId = req.body.productId;
    // const Stock = req.body.Stock;

    const cart = new Cart(req.body)

    cart.save((err) => {
        if (err) return res.status(400).json({
            success: false,
            err
        })
        return res.status(200).json({
            success: true
        })
    })
})

module.exports = router;