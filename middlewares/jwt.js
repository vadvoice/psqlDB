import jwt from 'jsonwebtoken'
import config from '../config'
import APIError from '../helpers/APIError'
import httpStatus from 'http-status'

module.exports = (req, res, next) => {
  if(!config || !config.jwtSecret) throw new Error('secret should be set')
  let token

  if(req.headers && req.headers.authorization) {
    let parts = req.headers.authorization.split(' ')
    if(parts.length == 2) {
      let scheme = parts[0];
      let credentials = parts[1];
      if(/^Bearer$/i.test(scheme)) {
        token = credentials
      } else next(new APIError('Unauthorized', httpStatus.UNAUTHORIZED, true))
    }
    let userJwt = jwt.verify(token, config.jwtSecret)
    if(!userJwt) next(new APIError('Unauthorized', httpStatus.UNAUTHORIZED, true))
    console.info('authorization completed');
    next()
  } else {
    next(new APIError('Unauthorized', httpStatus.UNAUTHORIZED, true))
  }
}

