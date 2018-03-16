import express from 'express'
import knex from '../../db/knex'

var router = express.Router();

/* GET users listing. */
function list(req, res, next) {
  knex('users').then(users => {
    console.log(users);
    res.json(users);
  })
}

export default list
