const router = require("express").Router()
const ctrls = require("../controllers/property")
const rateLimter = require("../middlewaves/rateLimiter")

router.use(rateLimter)
router.get("/", ctrls.getProperties)


module.exports = router
