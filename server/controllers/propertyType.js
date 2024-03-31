const asyncHandler = require("express-async-handler")
const db = require("../models")
const { Sequelize, or } = require("sequelize")
const { throwErrorWithStatus } = require("../middlewaves/errorHandler")

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
  const { limit, page, fields, name, sort, ...query } = req.query
  const options = {}
  if (fields) {
    const attributes = fields.split(",")
    const isExclude = attributes.some((el) => el.startsWith("-"))
    if (isExclude) {
      options.attributes = {
        exclude: attributes.map((el) => el.replace("-", "")),
      }
    } else options.attributes = attributes
  }

  if (name)
    query.name = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("name")),
      "LIKE",
      `%${name.toLocaleLowerCase()}%`
    )

  if (sort) {
    const order = sort
      .split(",")
      .map((el) =>
        el.startsWith("-")
          ? [el.replace("-", ""), "DESC"]
          : [el.replace("-", ""), "ASC"]
      )
    console.log("sort", sort)
    console.log("order", order)
    options.order = order
  }

  if (!limit) {
    const response = await db.PropertyType.findAll({
      where: query,
      ...options,
    })
    return res.json({
      success: response.length > 0,
      mes: response.length > 0 ? "Got" : "Cannot get propertyTypes",
      propertyType: response,
    })
  }

  const prevPage = page - 1 <= 0 ? 1 : page
  const offset = (prevPage - 1) * limit
  if (offset) options.offset = offset
  options.limit = +limit
  const response = await db.PropertyType.findAndCountAll({
    where: query,
    ...options,
  })
  return res.json({
    success: response.length > 0,
    mes: response.length > 0 ? "Got" : "Cannot get propertyTypes",
    propertyType: response,
  })
})

const updatePropertyType = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  if (Object.keys(req.body).length === 0)
    return throwErrorWithStatus(403, "Need less 1 argument", res, next)
  const response = await db.PropertyType.update(req.body, {
    where: { id },
  })

  return res.json({
    success: response[0] > 0,
    mes: response[0] > 0 ? "Updated" : "No data is update",
  })
})

const removePropertyType = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const response = await db.PropertyType.destroy({
    where: { id },
  })

  return res.json({
    success: response > 0,
    mes: response > 0 ? "Deleted" : "No data is deleted",
  })
})

module.exports = {
  createPropertyType,
  getPropertyType,
  updatePropertyType,
  removePropertyType,
}
