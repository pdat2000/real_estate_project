const asyncHandler = require("express-async-handler")
const db = require("../models")

module.exports = {
  getCurrent: asyncHandler(async (req, res) => {
    const { uid } = req.user
    const response = await db.User.findByPk(uid, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: db.User_Role,
          as: "userRoles",
          attributes: ["roleCode"],
          include: [
            {
              model: db.Role,
              as: "roleName",
              attributes: ["value"],
              next: false,
            },
          ],
        },
      ],
    })

    return res.json({
      success: Boolean(response),
      mes: response ? "Got" : "Can not get user",
      currentUser: response,
    })
  }),
  getRoles: asyncHandler(async (req, res) => {
    const response = await db.Role.findAll({
      attributes: ["code", "value"],
    })

    return res.json({
      success: Boolean(response),
      mes: response ? "Got" : "Can not get roles",
      roles: response,
    })
  }),
}
