const asyncHandler = require("express-async-handler")

const register = asyncHandler(async (req, res) => {
  const { password, phone, name, role } = req.body

  return res.json({
    success: true,
    mes: "API OK",
    data: { password, phone, name, role },
  })
})

module.exports = {
  register,
}
