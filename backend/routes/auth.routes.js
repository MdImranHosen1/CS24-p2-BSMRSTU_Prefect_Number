const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const User = require('../model/user.other.model')

router.post('/login',async (req,res)=>{

    const { userEmail, userPassword } = req.body;
  if (!userEmail && userEmail.trim() === "" && !userPassword && userPassword.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ userEmail });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordCorrect= bcrypt.compareSync(userPassword, existingUser.userPassword)
  
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  const payload = {
    id: existingUser._id,
    userName: existingUser.userName,
    userRoles:existingUser.userRoles,
    userType:existingUser.userType,
    userPhone:existingUser.userPhone,
    userEmail:existingUser.userEmail,
    stsOrLandfillNum: existingUser.stsOrLandfillNum
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .json({ 
        message: "Authentication Complete",
        id: existingUser._id,
        userName: existingUser.userName,
        userRoles:existingUser.userRoles,
        userType:existingUser.userType,
        userPhone:existingUser.userPhone,
        userEmail:existingUser.userEmail,
        stsOrLandfillNum: existingUser.stsOrLandfillNum,
        token: token 
    });
})
router.get('/logout',(req,res)=>{
    
})
router.put('/reset-password/initiate',(req,res)=>{
    
})
router.put('/reset-password/confirm',(req,res)=>{
    
})
router.put('/change-password',(req,res)=>{
    
})

module.exports = router