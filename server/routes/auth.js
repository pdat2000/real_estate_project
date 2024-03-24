const router = require("express").Router()
const ctrls = require("../controllers/auth")
const { stringReq, numberReq } = require("../middlewaves/joiSchema")
const Joi = require("joi")
const validateDto = require("../middlewaves/validation")
const { errHandler } = require("../middlewaves/errorHandler")

router.post(
  "/register",
  validateDto(
    Joi.object({
      password: stringReq,
      name: stringReq,
      phone: stringReq,
      role: numberReq,
    })
  ),
  errHandler,
  ctrls.register
)

module.exports = router
