import express from 'express';
import validation from 'express-validation'
import {createUser, updateUser} from './user.validation'
import jwt from '../../../middlewares/jwt'

const router = express.Router();

router.use(jwt)

router.get('/', require('./list'))
router.get('/superuser', require('./createSuperUser'))


export default router;
