import express from 'express'
import pg from 'pg'

const router = express.Router();

const { Pool, Client } = require('pg')
const os = require('os')
const user = os.userInfo().username
const password = 'code'

const connectionString = process.env.DATABASE_URL || `postgres://${user}:${password}@localhost:5432/todo`;

const client = new Client({
  connectionString: connectionString,
})
client.connect()

function list(req, res, next) {
  client.query('SELECT * FROM companies;', (err, resp) => {
    if (err) {
      throw err.stack
    }
    console.log(resp);
    res.end('not ready yet')
  })
}

module.exports = list