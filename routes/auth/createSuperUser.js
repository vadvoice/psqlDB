import { hash } from '../../helpers/hash.halper'
import knex from '../config'

function createSuperUser(req, res, next) {
  let params = {"name":"admin","email":"admin@admin.com", "password":"admin", "role_id":"0"}
  
  params.password = hash(params.password)
  knex('users').insert(params).then(resp => {
    res.json(resp)
  })
  .catch(err => console.error('error message: ', err))
}

export default createSuperUser;
