const express = require("express");
const router = express.Router();
const { Cart } = require("../models/CartModel");

//localhost:8070/cart/addCart ---> insert
http: router.post("/addCart", (req, res) => {
    const {
        productName,
        productPrice,
        productImage,
        quantity,
        userId,
        productId,
        Stock,
    } = req.body;

    const newcart = new Cart({
        productName,
        productPrice,
        productImage,
        quantity,
        userId,
        productId,
        Stock,
    });

    newcart.save().then(() => {
        res.json("Item added to cart Successfully...")
    }).catch((err) => {
        console.log(err);
    })
})

//localhost:8070/cart/updateCart/id ---> update

http: router.route("/update/:id").put(async(req, res) => {
    let userID = req.params.id;

    const { 
        productName,
        productPrice,
        productImage,
        quantity,
        userId,
        productId,
        Stock, 
    } = req.body;

    const updateCart = {
        productName,
        productPrice,
        productImage,
        quantity,
        userId,
        productId,
        Stock,
    };

    await Employee.findByIdAndUpdate(userID, updateCart)
        .then(() => {
            res.status(200).send({ status: "Cart updated successfully..." });
        })
        .catch((err) => {
            console.log(err);
            res
                .status(500)
                .send({ status: "Error with updating Data...", error: err.message });
        });
});
module.exports = router;