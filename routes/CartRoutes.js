const express = require("express");
const router = express.Router();
const { Cart } = require("../models/CartModel");

//localhost:8070/cart/add ---> insert
http: router.post("/add", (req, res) => {
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

//localhost:8070/cart/update/id ---> update
//632d693cb524aeebaae1c4f5
http: router.route("/update/:id").put(async(req, res) => {
    let ID = req.params.id;

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

    await Cart.findByIdAndUpdate(ID, updateCart)
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

//localhost:8070/cart/delete/id ---> delete
//632d693cb524aeebaae1c4f5

http: router.route("/delete/:id").delete(async(req, res) => {
    let ID = req.params.id;

    await Cart.findByIdAndDelete(ID)

    .then(() => {
            res.status(200).send({ status: "Cart Item syccessfully Deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: "Error with deleting item", error: err.message });
        });
});

//localhost:8070/cart/ ---> get all items
htttp: router.route("/").get((req, res) => {
    Cart.find()
        .then((cart) => {
            res.json(cart);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;