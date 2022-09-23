const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Review } = require("../models/ReviewModel");


//localhost:8070/review/addreview   -----> insert
http: router.post("/addreview", (req, res) => {

    const {
        userId,
        productId,
        rating,
        comment,
        //time,

    } = req.body;

    const newreview = new Review({
        userId,
        productId,
        rating,
        comment,
        //time,

    });

    newreview.save().then(() => {
        res.json("Review added Successfully...")
    }).catch(err => {
        console.log(err);
    })
})


module.exports = router;