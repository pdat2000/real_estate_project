const router = require("express").Router()
const ctrls = require("../controllers/auth")
const { stringReq, string } = require("../middlewaves/joiSchema")
const Joi = require("joi")
const validateDto = require("../middlewaves/validation")

router.post(
  "/signup",
  validateDto(
    Joi.object({
      password: stringReq,
      name: stringReq,
      phone: stringReq,
      roleCode: string,
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
