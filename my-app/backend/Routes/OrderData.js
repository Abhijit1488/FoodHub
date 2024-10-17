// const express = require('express');
// const router = express.Router()
// const Order = require('../models/Orders')

// router.post('/OrderData', async (req, res) => {
//     let data = req.body.order_data
//     await data.splice(0,0,{Order_date:req.body.order_date})
//     console.log("1231242343242354",req.body.email)

//     //if email not exisitng in db then create: else: InsertMany()
//     let eId = await Order.findOne({ 'email': req.body.email })    
//     console.log(eId)
//     if (eId===null) {
//         try {
//             console.log(data)
//             console.log("1231242343242354",req.body.email)
//             await Order.create({
//                 email: req.body.email,
//                 order_data:[data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)

//         }
//     }

//     else {
//         try {
//             await Order.findOneAndUpdate({email:req.body.email},
//                 { $push:{order_data: data} }).then(() => {
//                     res.json({ success: true })
//                 })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)
//         }
//     }
// })
// module.exports = router;


const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/OrderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        console.log(data)
        await data.splice(0, 0, { Order_date: req.body.order_date });
        console.log("1231242343242354", req.body.email);

        // Check if email is provided
        if (!req.body.email) {
            return res.status(400).send("Email is required");
        }

        // Check if the email already exists in the database
        let eId = await Order.findOne({ 'email': req.body.email });
        console.log(eId);

        if (eId === null) {
            try {
                console.log(data);
                console.log("1231242343242354", req.body.email);
                await Order.create({
                    email: req.body.email,
                    order_data: [data]
                });
                res.json({ success: true });
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Server Error: " + error.message);
            }
        } else {
            try {
                await Order.findOneAndUpdate(
                    { email: req.body.email },
                    { $push: { order_data: data } }
                );
                res.json({ success: true });
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Server Error: " + error.message);
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

router.post('/myOrderData', async (req, res) =>{
    try {
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})
    } catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
})

module.exports = router;