const {
  errHandler,
  badRequestException,
} = require('../middlewaves/errorHandler')
const auth = require('./auth')
const user = require('./user')
const properties = require('./property')
const propertyType = require('./propertyType')

const initRoutes = (app) => {
  app.use('/api/property-type', propertyType)
  app.use('/api/properties', properties)
  app.use('/api/user', user)
  app.use('/api/auth', auth)

  app.use(badRequestException)
  app.use(errHandler)
}

module.exports = initRoutes
