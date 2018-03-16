import jwt from 'jsonwebtoken'
import config from '../config'
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
      } else next(new Error('Unauthorized'))
    }
    let userJwt = jwt.verify(token, config.jwtSecret)
    if(!userJwt) next(new Error('Unauthorized'))
    console.log('authorization completed');
    next()
  }
}

