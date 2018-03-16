import { hash } from '../../helpers/hash.halper'
import knex from '../../db/knex'

function createSuperUser(req, res, next) {
  let params = {"name":"admin","email":"admin@admin.com", "password":"admin", "role_id":"10"}
  
  params.password = hash(params.password)
  knex('users').returning('*').insert(params).then(resp => {
    console.log('done', resp);
    res.json(resp)
  })
  .catch(err => console.error('error message: ', err))
}

export default createSuperUser;
