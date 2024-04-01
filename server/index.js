require("dotenv").config()
const express = require("express")
const cors = require("cors")
const dbconn = require("./config/dbConnect")
const initRoutes = require("./routes")
require("./config/redis.config")

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
dbconn()

initRoutes(app)


const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log("server ready " + PORT))
