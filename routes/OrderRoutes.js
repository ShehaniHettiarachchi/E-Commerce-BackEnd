const router = require("express").Router();
const { Customer } = require("../models/CustomerModel");
const { Order } = require("../models/OrderModel");

//Localhost:8070/order/newOrder
router.route("/newOrder").post((req,res)=>{

    const {
        shippingInfo,
        orderItems,
        customer,
        totalPrice,
        orderStatus,
        deliveredAt,
        createdAt,
    } = req.body;

    const newOrder = new Order({
        shippingInfo,
        orderItems,
        customer,
        totalPrice,
        orderStatus,
        deliveredAt,
        createdAt,
    });
    
    newOrder.save().then(()=>{
        res.json("Order Added Successfully")
    }).catch(err => {
        console.log(err);
    })

})

module.exports = router;