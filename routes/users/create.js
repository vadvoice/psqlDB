import express from 'express'
import {kenx} from '../../db/knex'
import Joi from 'joi'


const router = express.Router()

function create(req, res, next) {
  res.end('create')
}

export default create