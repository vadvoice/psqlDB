import express from 'express'
import authPath from './auth'
import companiesPath from './companies'
import usersPath from './users'
import todosPath from './todos'
import fs from 'fs';
import knex from '../db/knex';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('items').then(r => {
    res.render('index', { title: 'Express' });
  })
});

router.use('/auth', authPath)
router.use('/companies', companiesPath)
router.use('/users', usersPath)
router.use('/todos', todosPath)

module.exports = router;
  