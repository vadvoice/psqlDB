const AccessControl = require('accesscontrol');

const as = new AccessControl()

as.grant('admin')
    .createAny('user')
    .readAny('user', ["*", "!password"])
    .readAny('user')
    .deleteAny('user');

as.grant('tester')
  .createAny('user')
  .readAny('user');

as.grant('user').extend('tester')

module.exports = {
  'accesscontrol': as
}