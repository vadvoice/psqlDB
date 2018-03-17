import express from 'express'
import knex from '../../db/knex'
import { hash } from '../../helpers/hash.halper'
import { roles } from '../../db/enums'
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
      res.status(400).send(err)
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
    res.status(500).send('something went wrong')
  })
}

export default create