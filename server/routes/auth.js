const router = require("express").Router()
const ctrls = require("../controllers/auth")
const { stringReq } = require("../middlewaves/joiSchema")
const Joi = require("joi")
const validateDto = require("../middlewaves/validation")

router.post(
  "/register",
  validateDto(
    Joi.object({
      password: stringReq,
      name: stringReq,
      phone: stringReq,
      role: stringReq,
    })
  ),
  ctrls.register
)

router.post(
  "/signin",
  validateDto(
    Joi.object({
      password: stringReq,
      phone: stringReq,
    })
  ),
  ctrls.signIn
)

module.exports = router
