const express = require('express')
const router = express.Router()
const user = require('../models/user')
const { body, validationResult } = require('express-validator');
const  bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisCoder"

router.post("/creatuser",
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
  body('name').isLength({ min: 5 }),
   // name must be at least 5 chars long
   body('password','Invalid Password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        //Encode the password
        const salt = await bcrypt.genSalt(10);
        const securepass = await bcrypt.hash(req.body.password,salt)

        try {
            await user.create({
                name: req.body.name,
                password: securepass,
                email: req.body.email,
                location: req.body.location
            }).then(res.json({ success: true }));
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

    router.post("/loginuser",async (req, res) => {
        let email = req.body.email;
            try {
            let userdata = await user.findOne({email});
            if(!userdata){
                return res.status(400).json({ errors: "Enter a valid credentials" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password,userdata.password)
            if(!pwdCompare){
                return res.status(400).json({ errors: "Enter a valid Password" });
            }
            const data ={
                user:{
                    id:userdata.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)
            return res.json({success: true,authToken:authToken})
            } catch (error) {
                console.log(error);
                res.json({ success: false });
            }
        })
module.exports = router;