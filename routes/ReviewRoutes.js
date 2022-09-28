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

//localhost:8070/review/update/id ---> update
http: router.route("/update/:id").put(async(req, res) => {
    let ID = req.params.id;

    const { 
        userId,
        productId,
        rating,
        comment,
        time,
    } = req.body;

    const updateReview = {
        userId,
        productId,
        rating,
        comment,
        time,
    };

    await Review.findByIdAndUpdate(ID, updateReview)
        .then(() => {
            res.status(200).send({ status: "Review updated successfully..." });
        })
        .catch((err) => {
            console.log(err);
            res
                .status(500)
                .send({ status: "Error with updating Data...", error: err.message });
        });
});

//localhost:8070/review/delete/id ---> delete
//632d693cb524aeebaae1c4f5

http: router.route("/delete/:id").delete(async(req, res) => {
    let ID = req.params.id;

    await Review.findByIdAndDelete(ID)

    .then(() => {
            res.status(200).send({ status: "Cart Item successfully Deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: "Error with deleting item", error: err.message });
        });
});

//localhost:8070/review/ ---> get all items
htttp: router.route("/").get((req, res) => {
    Review.find()
        .then((cart) => {
            res.json(cart);
        })
        .catch((err) => {
            console.log(err);
        });
});


//-----get reviews from one product-----

router.route("/get/:id").get(async (req, res) => {
    let productId = req.params.productId;

    await Review.findOne(productId)
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