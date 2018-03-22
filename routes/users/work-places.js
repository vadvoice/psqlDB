import express from 'express'
import knex from '../../db/knex'

var router = express.Router();

function workPlaces(req, res, next) {
  knex('users').where('id', req.query.id).first().then(resp => {
    if(!resp) return next()
    let q = knex.raw('select * from companies where ?=any(employers);', [resp.id]).then(r => {
      console.log('::::', r.rows);
    res.json(r.rows)
    })
  })
}

export default workPlaces
