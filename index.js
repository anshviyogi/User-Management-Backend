const express = require("express")
const cors = require("cors")
const connectMongoose = require("./model/db.model.js")

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
connectMongoose();

// Routes
app.use("/", require("./Routes/Authenticate.js"))

app.listen(process.env.PORT, ()=> {
    console.log(`Server started at PORT: ${process.env.PORT}`)
})