const express = require("express")
const route = express.Router()
const bcryptjs = require("bcryptjs")
const User = require("../Schema/User.schema.js")
const createToken = require("../helper/createToken.js")
const jwt = require("jsonwebtoken")

route.get("/", (req, res) => {
    res.send("Testing Backend")
})

route.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body;
        
        // Check weather user exists
        let user = await User.findOne({email})

        if (!user) {
            return res.json({
                success:false,
                message: "No User found"
            })
        }

        console.log(user)

        let encryptedPassword = user.password;

        let checkPassword = await bcryptjs.compare(password, encryptedPassword)
        
        if (!checkPassword) {
            return res.json({
                success:false,
                message:"Invalid Password"
            })
        }

        let token = createToken({name: user.firstName + " " + user.lastName , email: user.email})

        res.cookie('jwt', token, {httpOnly: true, maxAge: 3600000})

        return res.json({
            success:true,
            message:"User Authenticated Successfully",
            token: token,
            username: user.firstName + " " + user.lastName
        })
    } catch (error) {
        return res.json({
            success:false,
            message: error.message
        })
    }
})

route.post("/register", async (req,res) => {
    try {
        const {firstName, lastName, password, email} = req.body;

        let emailCheck = await User.findOne({email})

        var salt = bcryptjs.genSaltSync(10);
        let encryptedPassword = await bcryptjs.hash(password, salt)

        if (emailCheck) {
            return res.json({
                success:false,
                message:"Email already exists"
            })
        }

        // Save User
        let newUser = new User({
            firstName,
            lastName,
            email,
            password: encryptedPassword
        })

        await newUser.save();

        return res.json({
            success:true,
            message:"User created successfully"
        })
    } catch (error) {
        return res.json({
            success:false,
            message: error.message
        })
    }
})

route.post("/verifyToken", async (req,res) => {
    try {
        const {token} = req.body;

        let verifyToken = await jwt.verify(token, process.env.JWT_SECRET)
        
        if (!verifyToken) {
            return res.json({
                success: false,
                message:"Token is not verified"
            })
        }

        return res.json({
            success: true,
            message: "Token Verified Successfully",
            username: verifyToken.name,
            email: verifyToken.email
        })
    } catch (error) {
        return res.json({
            success:false,
            message: error.message
        })
    }
})

module.exports = route;