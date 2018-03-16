import express from 'express'
import knex from "../../db/knex"
import Joi from "joi";

const router = express.Router()

const schema = Joi.object().keys({
  email: Joi.string().required(),
  name: Joi.string().min(3),
  password: Joi.string().min(8),
})

export default function(req, res, next) {
  Joi.validate(req.body, schema, (err, result) => {
    if(err) res.status(400).send(err)
  })
  const {email, password, name} = req.body
  
  // TODO check account ovner after updating
  knex('users').update({
    name: name,
    password: password
  }).where({email: email}).returning('*').then( resp => {
    console.log('fresh user obj: ', resp);
    res.end('Updated')
  }).catch(e => {
    console.error(e)
  })
}