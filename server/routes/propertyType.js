const router = require("express").Router()
const Joi = require("joi")
const ctrls = require("../controllers/propertyType")
const validateDto = require("../middlewaves/validation")
const { isAdmin, verifyToken } = require("../middlewaves/verifyToken")
const { stringReq } = require("../middlewaves/joiSchema")

router.post(
  "/",
  verifyToken,
  isAdmin,
  validateDto(
    Joi.object({
      name: stringReq,
      description: stringReq,
      images: stringReq,
    })
  ),
  ctrls.createPropertyType
)

router.get("/", ctrls.getPropertyType)

module.exports = router
