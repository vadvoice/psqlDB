
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import knex from '../../db/knex'
import { isValidPass } from '../../helpers/hash.halper'
import config from '../../config';

const schema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

function auth(req, res, next) {
  // validate after login
  const result = Joi.validate(req.body, schema, (err, result) => {
    if(err) {
      res.write('are you serious trying hack my service?');
      throw new Error(err);
    }
  })
  
  knex('users').where({
    email: req.body.email,
  }).first().then(user => {
    console.log('asdfsadf', user);
    
    if(!user) throw new Error('something went wrong...')
    if(isValidPass(user.password, req.body.password)) {
      console.log('hoho');
      const token = jwt.sign({
        id: user.id,
        email: user.email,
      }, config.jwtSecret)

      // done
      return res.json({
        token,
        id: user.id,
        email: user.email,
      })
    }
  }).catch(err => {
    console.error(err);
    res.end('fuck you!')
  })
}

export default auth;
