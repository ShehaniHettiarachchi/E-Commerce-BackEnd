const router = require("express").Router();
const { Customer } = require("../models/CustomerModel");
const { Order } = require("../models/OrderModel");

//Localhost:8070/order/newOrder
router.route("/newOrder").post((req, res) => {

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

    newOrder.save().then(() => {
        res.json("Order Added Successfully")
    }).catch(err => {
        console.log(err);
    })

})

// retrive all orders
//Localhost:8070/order
router.route("/").get((req, res) => {
    Order.find().then((Order) => {
        res.json(Order)
    }).catch((err) => {
        console.log(err);
    })

})

//update order status
//Localhost:8070/order/updateStatus/_id
router.route("/updateStatus/:id").put(async (req, res) => {
    const orderId = req.params.id;
    const { orderStatus } = req.body;

    const updateStatus = {
        orderStatus,

    }
    const update = await Order.findByIdAndUpdate(orderId, updateStatus).then(() => {

        res.status(200).send({ status: "Order updated Successfully" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", Order: update });

    })

})

//delete order
//Localhost:8070/order/delete/_id
router.route("/delete/:id").delete(async (req, res) => {
    const orderId = req.params.id;

    await Order.findByIdAndDelete(orderId)
        .then(() => {
            res.status(200).send({ status: "Order Deleted Successfully" });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete order", error: err.message });
        })
})

//get single order
//Localhost:8070/order/get/_id
router.route("/get/:id").get(async (req, res) => {
    let orderId = req.params.id;
    await Order.findById(orderId).then(() => {
        res.status(200).send({ status: "Order fethced",order: Order });
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching order", error: err.message });
    })

})



module.exports = router;