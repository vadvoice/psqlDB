import express from 'express';
import validation from 'express-validation'
import jwt from '../../middlewares/jwt'
import list from './list'
import create from './create'

const router = express.Router();

router.use(jwt)
router.get('/', list)
router.post('/create', create)

export default router;
