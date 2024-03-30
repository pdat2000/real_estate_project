const { throwErrorWithStatus } = require("./errorHandler")
const jwt = require("jsonwebtoken")
const db = require("../models")

const verifyToken = (req, res, next) => {
  const token = req.headers?.authorization.startsWith("Bearer")
  if (!token) return throwErrorWithStatus(401, "Creds not provide", res, next)
  const rawToken = req.headers?.authorization?.split(" ")[1]
  jwt.verify(rawToken, process.env.JWT_SECRET, (err, decode) => {
    if (err) throwErrorWithStatus(401, "Creds invalid.", res, next)
    req.user = decode
    next()
  })
}

const isAgent = (req, res, next) => {
  const { role } = req.user
  if (role !== "ROL1" || role !== "ROL5" || role !== "ROL3")
    return throwErrorWithStatus(401, "Bạn không có quyền truy cập", res, next)
  next()
}

const isOwner = (req, res, next) => {
  const { role } = req.user
  if (role !== "ROL1" || role !== "ROL3")
    return throwErrorWithStatus(401, "Bạn không có quyền truy cập", res, next)
  next()
}

const isAdmin = (req, res, next) => {
  const { role } = req.user
  if (role !== "ROL1")
    return throwErrorWithStatus(401, "Bạn không có quyền truy cập", res, next)
  next()
}

module.exports = { verifyToken, isAgent, isAdmin, isOwner }
