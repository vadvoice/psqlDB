const config = require('../config')
const knex = require('knex')
const os = require('os')

// user info
const user = os.userInfo().username
const password = 'code'

const connectionString = process.env.DATABASE_URL || `postgres://${user}:${password}@localhost:5432/todo`;

export default knex({
  client: 'pg',
  connection: connectionString,
  acquireConnectionTimeout: 15000,
})
