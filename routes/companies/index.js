import express from 'express';

const router = express.Router();

router.get('/', require('./list'))

export default router;
