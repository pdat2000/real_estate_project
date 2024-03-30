const asyncHandler = require("express-async-handler")
const db = require("../models")
const { Sequelize } = require("sequelize")

const createPropertyType = asyncHandler(async (req, res) => {
  const { name } = req.body
  const response = await db.PropertyType.findOrCreate({
    where: { name },
    defaults: req.body,
  })

  return res.json({
    success: response[1],
    mes: response[1] ? "Created" : "Name property duplicated",
    propertyType: response[1],
  })
})

const getPropertyType = asyncHandler(async (req, res) => {
  const { limit, page, fields, type, name, ...query } = req.query
  const options = {}
  if (fields) {
    const attributes = fields.split(",")
    const isExclude = attributes.some((el) => el.startsWith("-"))
    if (isExclude) {
      options.attributes = {
        exclude: attributes.map((el) => el.replace("-", "")),
      }
    } else {
      options.attributes = attributes
    }
  }

  if (name)
    query.name = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("name")),
      "LIKE",
      `%${name.toLocaleLowerCase()}%`
    )
  if (type === "ALL") {
    const response = await db.PropertyType.findAll({
      where: query,
      ...options,
    })
    return res.json({
      success: response.length > 0,
      mes: response.length > 0 ? "Got" : "Cannot get propertyTypes",
      propertyType: response,
    })
  } else {
    return res.json({})
  }
})

module.exports = { createPropertyType, getPropertyType }
