import express from 'express';
import validation from 'express-validation'
import auth from './auth'
import createSuperUser from './createSuperUser'

const router = express.Router();

router.get('/ping', function(req, res, next) {
    res.end('alright you are connected!')
})

router.post('/login', auth)
router.post('/superuser', createSuperUser)

export default router
