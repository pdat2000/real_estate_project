const asyncHandler = require('express-async-handler')
const db = require('../models')
const redis = require('../config/redis.config')
const { Sequelize, Op } = require('sequelize')

module.exports = {
  // getCurrent: asyncHandler(async (req, res) => {
  //   const response = await db.User.findByPk(uid, {
  //     attributes: { exclude: ['password'] },
  //   })

  //   return res.json({
  //     success: Boolean(response),
  //     mes: response ? 'Got' : 'Can not get user',
  //     currentUser: response,
  //   })
  // }),

  getProperties: asyncHandler(async (req, res) => {
    const { limit, page, fields, name, sort, address, price, ...query } =
      req.query
    const options = {}

    if (fields) {
      const attributes = fields.split(',')
      const isExclude = attributes.some((el) => el.startsWith('-'))
      if (isExclude) {
        options.attributes = {
          exclude: attributes.map((el) => el.replace('-', '')),
        }
      } else options.attributes = attributes
    }

    if (address) {
      query.address = Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('Property.address')),
        'LIKE',
        `%${address.toLocaleLowerCase()}%`
      )
    }

    if (sort) {
      const order = sort
        .split(',')
        .map((el) =>
          el.startsWith('-')
            ? [el.replace('-', ''), 'DESC']
            : [el.replace('-', ''), 'ASC']
        )
      options.order = order
    }

    if (!limit) {
      const alreadyGetAll = await redis.get('get-properties')
      if (alreadyGetAll)
        return res.json({
          success: true,
          mes: 'Got',
          properties: JSON.parse(alreadyGetAll),
        })

      const response = await db.Property.findAll({
        where: query,
        ...options,
      })
      redis.set('get-properties', JSON.stringify(response))
      return res.json({
        success: response.length > 0,
        mes: response.length > 0 ? 'Got' : 'Cannot get properties',
        properties: response,
      })
    }

    if (price) {
      const isBetweenFilter = price?.every((el) => !isNaN(el))
      if (isBetweenFilter) query.price = { [Op.between]: price }
      else {
        const number = price?.find((el) => !isNaN(el))
        const operator = price?.find((el) => isNaN(el))
        query.price = { [Op[operator]]: number }
      }
    }

    const prevPage = page - 1 <= 0 ? 1 : page
    const offset = (prevPage - 1) * limit
    if (offset) options.offset = offset
    options.limit = +limit
    const response = await db.Property.findAndCountAll({
      where: query,
      ...options,
      include: [
        {
          model: db.User,
          as: 'rPostedBy',
          attributes: ['avatar', 'phone', 'name', 'email'],
        },
        {
          model: db.User,
          as: 'rOwner',
          attributes: ['avatar', 'phone', 'name', 'email'],
        },
      ],
    })

    return res.json({
      success: response.rows.length > 0,
      mes: response.length > 0 ? 'Got' : 'Cannot get properties',
      properties: response
        ? { ...response, limit: +limit, page: +page ? +page : 1 }
        : null,
    })
  }),

  getOneById: asyncHandler(async (req, res) => {
    const { propertyId } = req.params

    const response = await db.Property.findByPk(propertyId, {
      include: [
        {
          model: db.PropertyType,
          as: 'rPropertyType',
          attributes: ['name', 'images'],
        },
        {
          model: db.User,
          as: 'rPostedBy',
          attributes: ['name', 'phone', 'avatar'],
        },
        {
          model: db.User,
          as: 'rOwner',
          attributes: ['name', 'phone', 'avatar'],
        },
      ],
    })

    return res.json({
      success: !!response,
      mes: response ? 'Got' : 'Can not get property details',
      data: response,
    })
  }),
}
