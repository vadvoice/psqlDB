import express from 'express'
import knex from '../../db/knex'
import Joi from 'joi'

const router = express.Router()

const schema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})

function create(req, res, next) {
  Joi.validate(req.body, schema, (err, result) => {
    if (err) res.status(400).send(err)
    console.log('validation complited');
  })
  const {name, email, password} = req.body

  knex('users').where({email: req.body.email}).returning('email').then( existEmail => {
    // if user with same email exist
    if(existEmail.length) res.status(400).send('user already exist!')
    
    // otherwise insert user to db
    knex('users').insert({name: name, email: email, password: password}).returning('*').then( inserResp => {
      console.log(inserResp);
      res.end('created')
    })
  }).catch(e => {
    console.log('time to panic!!!');
    res.status(500).send(e)
  })
}

export default create