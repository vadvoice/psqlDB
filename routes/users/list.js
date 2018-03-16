import express from 'express'

var router = express.Router();

/* GET users listing. */
function list(req, res, next) {
  res.send('respond with a resource');
}

export default list
