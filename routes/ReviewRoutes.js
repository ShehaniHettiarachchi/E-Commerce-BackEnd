const express = require("express");
const router = express.Router();
const { Review } = require("../models/ReviewModel");


//localhost:8070/review/add   -----> insert
http: router.post("/add", (req, res) => {

    const {
        userId,
        productId,
        rating,
        comment,
        time,

    } = req.body;

    const newreview = new Review({
        userId,
        productId,
        rating,
        comment,
        time,

    });

    newreview.save().then(() => {
        res.json("Review added Successfully...")
    }).catch(err => {
        console.log(err);
    })
})

//-----get reviews from one product-----

router.route("/get/:id").get(async (req, res) => {
    let productId = req.params.id;

    await Review.findById(productId)
      .then((review) => {
        res.status(200).send({ status: "User fetched", review });
      })
      .catch(() => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "Error with get user", error: err.message });
      });
  });

module.exports = router;