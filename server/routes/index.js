const {
  errHandler,
  badRequestException,
} = require("../middlewaves/errorHandler")
const auth = require("./auth")
const user = require("./user")
const insert = require("./insert")

const initRoutes = (app) => {
  app.use("/api/insert", insert)
  app.use("/api/user", user)
  app.use("/api/auth", auth)

  app.use(badRequestException)
  app.use(errHandler)
}

module.exports = initRoutes
