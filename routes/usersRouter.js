const express=require('express');
const router=express.Router();
const userModel=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { generateToken }=require('../utils/generatetoken')
const {registerUser, loginUser} =require('../controlers/authController')



router.get("/",function(req,res){
    res.send("hey its working")
})


router.post("/register",registerUser)
router.post("/login",loginUser)

module.exports=router;