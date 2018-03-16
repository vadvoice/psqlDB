import express from 'express';
import validation from 'express-validation'
import jwt from '../../middlewares/jwt'
import list from './list'

const router = express.Router();

router.use(jwt)
router.get('/', list)

export default router;
