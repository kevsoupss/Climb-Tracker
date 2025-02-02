require("dotenv").config()

const config = require("./config.json")
const mongoose = require("mongoose")

mongoose.connect(config.connectionString)

const User = require("./models/user.model")
const Climb = require("./models/climb.model")

const express = require("express")
const cors = require("cors")
const app = express()

const jwt = require("jsonwebtoken")
const { authenticateToken } = require("./utilities")

app.use(express.json())

app.use(
    cors({
        origin: "*"
    })
)

app.get("/", (req,res) => {
    res.json({data: "hello"})
})

// Creating account
app.post("/create-account", async (req, res) => {

    const { fullName, email, password } = req.body

    if (!fullName) {
        return res.status(400).json({error: true, message: "Full Name is required"})
    }

    if (!email) {
        return res.status(400).json({error: true, message: "Email is required"})
    }

    if (!password) {
        return res.status(400).json({error: true, message: "Password is required"})
    }

    const isUser = await User.findOne({ email: email})

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists"
        })
    }

    const user = new User({
        fullName,
        email,
        password,
    })

    await user.save()

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    })

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful"
    })
}) 

// Login
app.post("/login", async (req, res) => {

    const { email, password} = req.body

    if (!email) {
        return res.status(400).json({message: "Email is required"})
    }

    if (!password) {
        return res.status(400).json({message: "Password is required"})
    }

    const userInfo = await User.findOne({ email: email})

    if (!userInfo) {
        return res.status(400).json({message: "User not found"})
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = { user:userInfo} 
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m"
        })
        

        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken
        })
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials"
        })
    }

})

app.post("/add-climb", authenticateToken, async (req, res) => {
    const { title, desc, link, vlevel} = req.body
    const { user } = req.user

    if(!title) {
        return res.status(400).json({error: true, message: "Title is required"})
    }

    if(!desc) {
        return res.status(400).json({error: true, message: "Description is required"})
    }

    if(!link) {
        return res.status(400).json({error: true, message: "Link is required"})
    }

    if(!vlevel) {
        return res.status(400).json({error: true, message: "V level is required"})
    }

    try {
        const climb = new Climb({
            title,
            desc,
            link,
            vlevel,
            userId: user._id,

        })
        await climb.save()

        return res.json({
            error: false,
            climb,
            message: "Climb added successfully"
        })

    } catch( error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }

    
})

app.put("/edit-climb/:climbId", authenticateToken, async (req, res) => {
    const climbId = req.params.climbId
    const { title, desc, link, vlevel, isStarred} = req.body
    const { user } = req.user
    
    if(!title && !desc && !link && !vlevel) {
        return res.status(400).json({error: true, message:"No changes provided"})
    }

    try {
        const climb = await Climb.findOne({_id: climbId, userId : user._id})
        if (!climb) {
            return res.status(404).json({error: true, message: "Climb not found"})
        }
        if (title) climb.title = title
        if (desc) climb.desc = desc
        if (link) climb.link = link
        if (vlevel) climb.vlevel = vlevel

        await climb.save()

        return res.json({
            error: false,
            climb,
            message:"Climb updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }

    


})

app.listen(8000)

module.exports = app