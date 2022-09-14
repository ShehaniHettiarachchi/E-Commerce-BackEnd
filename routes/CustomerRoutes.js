const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Customer } = require("../models/CustomerModel");

//Localhost:8070/customer/register

http: router.post("/register", (req, res) => {

  Customer.find({ email: req.body.email })
    .exec()
    .then((customer) => {
      if (customer.length >= 1) {
        return res.status(401).json({
          status: false,
          message: "Email exists",
          data: undefined,
        });
      } else {
        bcrypt.hash(req.body.password, 2, (err, hash) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: "Error, cannot encrypt password",
              data: undefined,
            });
          } else {
            const customer = new Customer({ ...req.body, password: hash });
            customer.save((err, doc) => {
              if (err)
                return res.json({
                  status: false,
                  message: err,
                  data: undefined,
                });

              return res.status(200).json({
                status: true,
                message: "Register Successfully",
                data: doc,
              });
            });
          }
        });
      }
    });
});

//localhost:8070/customer/

http: router.route("/").get((req, res) => {

  Customer.find()
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
    });
});

//localhost:8070/customer/delete/


http: router.route("/delete/:id").delete(async (req, res) => {
  let userID = req.params.id;

  await Customer.findByIdAndDelete(userID)

    .then(() => {
      res.status(200).send({ status: "User syccessfully Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting user", error: err.message });
    });
});

//localhost:8070/customer/get/


router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id;
  const user = await Customer.findById(userID)
    .then((customer) => {
      res.status(200).send({ status: "User fetched", customer });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

module.exports = router;