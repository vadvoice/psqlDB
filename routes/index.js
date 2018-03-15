import authPath from './auth'
import fs from 'fs';
import knex from './config';

const express = require('express');
const pg = require('pg');
const path = require('path');
const os = require('os')
const { Pool, Client } = require('pg')

const router = express.Router();

router.use('/auth', authPath)

// user info
const user = os.userInfo().username
const password = 'code'

const connectionString = process.env.DATABASE_URL || `postgres://${user}:${password}@localhost:5432/todo`;

const client = new Client({
  connectionString: connectionString,
})
client.connect()

const pool = new Pool({
  connectionString: connectionString,
}
)

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('items').then(r => {
    res.render('index', { title: 'Express' });
  })
});

router.get('/todos', (req, res, next) => {
  const text = 'SELECT * FROM items ORDER BY id ASC;'
  
  // show table content
  pool.connect((err, client, done) => {
    if (err) throw err
    client.query('SELECT * FROM items ORDER BY id ASC;', (err, result) => {
      if (err) {
        throw err.stack
      } else {
        console.log(result.rows)
        if(result.rows[0] && result.rows.length) {
          res.render('list', { data: result.rows })
        }
        else return res.end("You haven't got any item yet")
      }
    })
  })

});

router.post('/todos', (req, res, next) => {
    // Grab data from http request
    const data = {text: req.body.text, complete: req.body.complete};

    const text = 'INSERT INTO items(text, complete) VALUES($1, $2) RETURNING *'
    const values = [data.text, data.complete]

    client.query(text, values)
      .then(res => {
        console.log('succes:', res.rows[0])
      })
      .catch(e => console.error(e.stack))
  });

router.put('/todos/:todo_id', (req, res, next) => {
  // Grab data from http request
  const data = {text: req.body.text, complete: req.body.complete, id: req.params.todo_id};

  const text = 'UPDATE items SET text=($1), complete=($2) WHERE id=($3)'
  const values = [data.text, data.complete, data.id]
  
  // check selection
  client.query('SELECT count(*) FROM items WHERE ID=($1)', [values.id]).then(r => {
    if (r.rowCount) update()
    else res.json({
      message: "You haven't any deal we this id"
    })
  })

  // UPDATE IF ITEM EXIST
  function update() {
    client.query(text, values)
      .then(r => {
        console.log('succes update:', r)
        res.json({message: 'Vsjo'})
      })
      .catch(e => console.error(e.stack))
  }
})

module.exports = router;
  