const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const os = require('os')
const { Pool, Client } = require('pg')

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
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/todos', (req, res, next) => {
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

router.post('/api/v1/todos', (req, res, next) => {
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

router.put('/api/v1/todos/:todo_id', (req, res, next) => {
  // Grab data from http request
  const data = {text: req.body.text, complete: req.body.complete, id: req.id};

  const text = 'UPDATE items SET text=($1), complete=($2) WHERE id=($3)'
  const values = [data.text, data.complete, data.id]

  client.query(text, values)
    .then(res => {
      console.log('succes update:', res)
    })
    .catch(e => console.error(e.stack))

  // then get update date
  // pool.connect((err, client, done) => {
  //   if (err) throw err
  //   client.query('SELECT * FROM items ORDER BY id ASC;', (err, result) => {
  //     if (err) {
  //       throw err.stack
  //     } else {
  //       console.log(result.rows[0])
  //       return res.json(result.rows[0]);
  //     }
  //   })
  // })
})

module.exports = router;
  