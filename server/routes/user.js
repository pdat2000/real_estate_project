const router = require('express').Router()
const ctrls = require('../controllers/user')
const { stringReq, array, string } = require('../middlewaves/joiSchema')
const validateDto = require('../middlewaves/validation')
const { verifyToken } = require('../middlewaves/verifyToken')
const Joi = require('joi')

router.get('/current', verifyToken, ctrls.getCurrent)
router.get('/roles', ctrls.getRoles)
router.put(
  '/profile',
  verifyToken,
  validateDto(
    Joi.object({
      name: stringReq,
      email: stringReq,
      address: stringReq,
      avatar: array,
      phone: string,
    })
  ),
  ctrls.updateProfile
)

module.exports = router
