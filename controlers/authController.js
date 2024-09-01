const express=require('express');
const router=express.Router();
const userModel=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { generateToken }=require('../utils/generatetoken')


module.exports.registerUser=async function(req,res){
   

    try{
        let {email,fullname,password}=req.body;
        let user=await userModel.findOne({email: email})
        if(user) return res.send("User already exist")

    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
            if(err) return res.send(err.message)
            else {
                let user=await userModel.create({
                    email,
                    password: hash,
                    fullname,
               });

               let token=generateToken(user)
               res.cookie("token",token)
               res.send("user created")
            }
        })
    })
        
    }

    catch(err){
        res.send("err.message")
    }
}

module.exports.loginUser=async function(req,res){
    let {email,password}=req.body

    let user=await userModel.findOne({email:email})
    if(!user){
        res.send("Email or Password incorrect")
    }
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token=generateToken(user)
            res.cookie("token",token)
            res.redirect("/shop")
        }
        else{
            res.send("Email or Password incorrect")
        }
    })
}