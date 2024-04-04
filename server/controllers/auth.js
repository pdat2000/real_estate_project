const asyncHandler = require("express-async-handler")
const db = require("../models")
const { throwErrorWithStatus } = require("../middlewaves/errorHandler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = asyncHandler(async (req, res) => {
  const { phone, password, name } = req.body

  const response = await db.User.findOrCreate({
    where: { phone },
    defaults: {
      phone,
      password,
      name,
    },
  })
  const userId = response[0]?.id
  if (userId) {
    const roleCode = ["ROL7"]
    if (req.body?.roleCode) roleCode.push(req.body?.roleCode)
    const roleCodeBulk = roleCode.map((role) => ({ userId, roleCode: role }))
    const updateRole = await db.User_Role.bulkCreate(roleCodeBulk)
    if (!updateRole) await db.User.destroy({ where: { id: userId } })
  }

  return res.json({
    success: response[1],
    mes: response[1]
      ? "Your account is created."
      : "Phone number already had exists",
  })
})

const signIn = asyncHandler(async (req, res, next) => {
  const { password, phone } = req.body

  const user = await db.User.findOne({
    where: { phone },
  })
  if (!user)
    throwErrorWithStatus(
      401,
      `User with that phone haven't registered`,
      res,
      next
    )
  const isMatchingPassword = bcrypt.compareSync(password, user.password)
  if (!isMatchingPassword)
    return throwErrorWithStatus(401, `Password is wrong.`, res, next)
  const token = jwt.sign(
    { uid: user.id, role: user.roleCode },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  return res.json({
    success: true,
    mes: "Sign in successfully",
    accessToken: token,
  })
})

module.exports = {
  register,
  signIn,
}
