const asyncHandler = require('express-async-handler')
const db = require('../models')

module.exports = {
  getCurrent: asyncHandler(async (req, res) => {
    const { uid } = req.user

    const response = await db.User.findByPk(uid, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: db.User_Role,
          as: 'userRoles',
          attributes: ['roleCode'],
          include: [
            {
              model: db.Role,
              as: 'roleName',
              attributes: ['value'],
              next: false,
            },
          ],
        },
      ],
    })

    return res.json({
      success: Boolean(response),
      mes: response ? 'Got' : 'Can not get user',
      currentUser: response,
    })
  }),
  getRoles: asyncHandler(async (req, res) => {
    const response = await db.Role.findAll({
      attributes: ['code', 'value'],
    })

    return res.json({
      success: Boolean(response),
      mes: response ? 'Got' : 'Can not get roles',
      roles: response,
    })
  }),
  updateProfile: asyncHandler(async (req, res) => {
    const { name, email, address, avatar, phone } = req.body
    const updateData = new Object()
    const { uid } = req.user

    if (avatar && avatar.length > 0) updateData.avatar = avatar[0]
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (address) updateData.address = address
    if (phone) {
      const userRoles = await db.User_Role.findAll({
        where: { userId: uid },
        raw: true,
      })
      if (userRoles.length === 1 && userRoles[0].roleCode === 'ROL7')
        updateData.phone = phone
    }
    const response = await db.User.update(updateData, { where: { id: uid } })

    return res.json({
      success: response[0] > 0,
      mes: response[0] > 0 ? 'Updated' : 'Cannot update profile',
    })
  }),
}
