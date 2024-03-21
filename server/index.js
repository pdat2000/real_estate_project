require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
)
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log("server ready " + PORT))
