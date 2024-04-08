const router = require("express").Router()
const Joi = require("joi")
const ctrls = require("../controllers/propertyType")
const validateDto = require("../middlewaves/validation")
const { isAdmin, verifyToken } = require("../middlewaves/verifyToken")
const { stringReq, string } = require("../middlewaves/joiSchema")
const rateLimter = require("../middlewaves/rateLimiter")

router.use(rateLimter)
router.post(
  "/",
  verifyToken,
  // isAdmin,
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
router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  validateDto(
    Joi.object({
      name: string,
      description: string,
      images: string,
    })
  ),
  ctrls.updatePropertyType
)
router.delete("/:id", verifyToken, isAdmin, ctrls.removePropertyType)

module.exports = router
