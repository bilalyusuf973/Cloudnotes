const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "bilalyusufisagoodb$oy";


//ROUTE 1: Create a user using : POST '/api/auth/createuser'. No Login Required

router.post('/createuser',[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password length must be atleast 8 characters').isLength({ min: 8 }),
  body('name', 'Enter a valid name').isLength({min : 2})],
   async (req, res) => {
    // check for errors and if there are errors then show them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let success = true;

    try{
      // check whether a user with the same email already exists or not?
        let user = await User.findOne({email: req.body.email});

        if(user){
            success = false;
            return res.status(400).json({success, error: "Sorry a user with the same email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
        });

        const data = {
          user: {
            id: user.id
          }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({success, authToken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error!");

    }
 });


//ROUTE 2: Authenticate a user using : POST '/api/auth/login'.

router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()],
   async (req, res) => {
    // check for errors and if there are errors then show them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        let success = true;
        if(!user){
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
          success = false;
          return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        const data = {
          user: {
            id: user.id
          }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({success, authToken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
 });


//ROUTE 3: fetch details of a user using : POST '/api/auth/getuser'. Login Required

router.post('/getuser', fetchuser, async (req, res) => {

    try{
      const userID = req.user.id;
      const user = await User.findById(userID).select("-password");
      res.send(user);

    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
 });

module.exports = router;
