import express from 'express';
import validation from 'express-validation'
import jwt from '../../middlewares/jwt'
import list from './list'
import create from './create'
import update from './update'
import work from './work-places'

const router = express.Router();

router.use(jwt)
router.get('/', list)
router.post('/create', create)
router.post('/update', update)
router.get('/work-places', work)

export default router;
