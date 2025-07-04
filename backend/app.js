const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.json())
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useNewUnifiedTopology: true
})
app.use("/api/auth", require("./routes/auth.js"))

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
