import express from 'express'
import knex from '../../db/knex'
import { hash } from '../../helpers/hash.halper'
import { roles } from '../../db/enums'
import { accesscontrol } from '../../middlewares/accesscontrol'
import Joi from 'joi'

const router = express.Router()

const avaliableRoles = Object.keys(roles);
const schema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid(avaliableRoles),
})

function create(req, res, next) {
  Joi.validate(req.body, schema, (err, result) => {
    if (err) {
      console.log(err);
      err.status = 400
      next(err)
    }
    console.log('validation complited');
  })
  let {role, ...params} = req.body
  params.password = hash(params.password)
  
  knex('users').where({email: params.email}).returning('email').then( existEmails => {
    // if user with same email exist
    if(existEmails.length) {
      res.statusCode = 404;
      next(new Error('User already exist'));
    }

    if(role) {
      params.role_id = roles[role]
    }
    
    // otherwise insert user to db
    if(!existEmails.length) {
      knex('users').insert(params).returning('*')
        .then( insertResp => {
          console.log(insertResp);
          res.end('created')
        })
    }
  }).catch(e => {
    console.error('time to panic!!!: ', e);
    e.status = 500
    next(e)
  })
}

export default create